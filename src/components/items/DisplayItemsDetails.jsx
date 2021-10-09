import { useState } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { itemsPath } from '../../utils/routepath';
import {
  Typography,
  Breadcrumbs,
  Link as BreadCrumbLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormFields, { itemsFieldKeys }  from './FormFields';
import { deleteItems, updateItems } from '../../api/items';
import { Alert } from '@material-ui/lab';
import isEqual from 'lodash.isequal';
const errorMsg = 'Something went wrong. Please try again';
const successMsg = 'Items Details Added Successfully';

const useStyles = makeStyles({
  breadCrumbText: {
    color: 'inherit',
  },
  horizontalSplit: {
    display: 'flex',
    marginTop: '20px',
    marginBottom: '40px',
  },
  verticalSplit: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  itemsText: {
    display: 'flex',
    alignItems: 'center',
  },
  contentContainer: {
    width: '50%',
  },

  updateBtn: {
    marginBottom: '10px',
  },
  errorContainer: {
    marginBottom: '20px',
  },
});
export default function DisplayItemsDetails(props) {
  const location = useLocation();
  const history = useHistory();
  const { itemsData: data = {} } = location.state || {};
  const [prevItemsData, updatePrevItemsData] = useState(data);
  const [isFormValid, updateIsFormValid] = useState(false);
  const [itemsData, updateItemsData] = useState(data);
  const [isChanged, updateIsDataChanged] = useState(false);
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (newItemsData,) => {
    const isValid = isFormValidFun(newItemsData)
    updateItemsData(newItemsData)
    updateIsFormValid(isValid)
    updateIsDataChanged(!isEqual(prevItemsData, newItemsData));
  };
  const isFormValidFun = (updatedItemsData)=>{
    let isFormValid = false
    for (let index = 0; index < itemsFieldKeys.length; index++) {
      const { id, type: inputType } = itemsFieldKeys[index];
      const value = updatedItemsData[id];
      if (!value) {
        isFormValid = false;
        break;
      } else if (inputType === 'number' && isNaN(value)) {
        isFormValid = false;
        break;
      } else if (inputType === 'email' && !validateEmail(value)) {
        isFormValid = false;
        break;
      } else {
        isFormValid=true
      }
      return isFormValid;
    }
    
  }
  const onClickDeleteItems = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const status = await deleteItems(data.id);
    if (status.success) {
      history.push(itemsPath);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  const submitItemsData = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const { id, ...payload } = itemsData;
    const updateStatus = await updateItems({ ...payload }, id);
    if (updateStatus.success) {
      updatePrevItemsData(itemsData);
      updateIsDataChanged(false);
      updateErrorStatus({ status: 'success', message: successMsg });
      setTimeout(() => {
        updateErrorStatus({ status: 'not_set' });
      }, 5000);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  if (!data.id) return <Redirect to={itemsPath} />;
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadCrumbLink component="div" color="inherit">
          <Link to="/" className={classes.breadCrumbText}>
            Material-UI
          </Link>
        </BreadCrumbLink>
        <BreadCrumbLink component="div" color="inherit">
          <Link to={itemsPath} className={classes.breadCrumbText}>
            Items
          </Link>
        </BreadCrumbLink>
        <Typography color="textPrimary">{prevItemsData.name}</Typography>
      </Breadcrumbs>
      <div className={classes.contentContainer}>
        <div className={classes.horizontalSplit}>
          <div className={classes.itemsText}>
            <Typography color="textPrimary" variant="h4">
              {prevItemsData.name}
            </Typography>
          </div>
          <div className={classes.verticalSplit}>
            <Button
              color="primary"
              variant={'contained'}
              onClick={submitItemsData}
              disabled={
                !isChanged ||
                errorStatus.status === 'inprogress' ||
                !isFormValid
              }
              className={classes.updateBtn}
            >
              Update
            </Button>
            <Button
              color="secondary"
              variant={'contained'}
              onClick={onClickDeleteItems}
              disabled={errorStatus.status === 'inprogress'}
            >
              Delete
            </Button>
          </div>
        </div>
        {(errorStatus.status === 'success' ||
          errorStatus.status === 'error') && (
          <Alert
            className={classes.errorContainer}
            severity={errorStatus.status}
          >
            {errorStatus.message}
          </Alert>
        )}
        <div>
          <FormFields onValueChange={onInputChange} data={data} />
        </div>
      </div>
    </div>
  );
}
