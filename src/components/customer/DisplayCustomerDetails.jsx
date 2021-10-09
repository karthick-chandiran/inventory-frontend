import { useState } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { customerPath } from '../../utils/routepath';
import {
  Typography,
  Breadcrumbs,
  Link as BreadCrumbLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormFields, { customerFieldKeys }  from './FormFields';
import { deleteCustomer, updateCustomer } from '../../api/customer';
import { Alert } from '@material-ui/lab';
import isEqual from 'lodash.isequal';
const errorMsg = 'Something went wrong. Please try again';
const successMsg = 'Customer Details Added Successfully';

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
  customerText: {
    display: 'flex',
    alignCustomer: 'center',
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
export default function DisplayCustomerDetails(props) {
  const location = useLocation();
  const history = useHistory();
  const { customerData: data = {} } = location.state || {};
  const [prevCustomerData, updatePrevCustomerData] = useState(data);
  const [isFormValid, updateIsFormValid] = useState(false);
  const [customerData, updateCustomerData] = useState(data);
  const [isChanged, updateIsDataChanged] = useState(false);
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (newCustomerData,) => {
    const isValid = isFormValidFun(newCustomerData)
    updateCustomerData(newCustomerData)
    updateIsFormValid(isValid)
    updateIsDataChanged(!isEqual(prevCustomerData, newCustomerData));
  };
  const isFormValidFun = (updatedCustomerData)=>{
    let isFormValid = false
    for (let index = 0; index < customerFieldKeys.length; index++) {
      const { id, type: inputType } = customerFieldKeys[index];
      const value = updatedCustomerData[id];
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
  const onClickDeleteCustomer = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const status = await deleteCustomer(data.id);
    if (status.success) {
      history.push(customerPath);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  const submitCustomerData = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const { id, ...payload } = customerData;
    const updateStatus = await updateCustomer({ ...payload }, id);
    if (updateStatus.success) {
      updatePrevCustomerData(customerData);
      updateIsDataChanged(false);
      updateErrorStatus({ status: 'success', message: successMsg });
      setTimeout(() => {
        updateErrorStatus({ status: 'not_set' });
      }, 5000);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  if (!data.id) return <Redirect to={customerPath} />;
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadCrumbLink component="div" color="inherit">
          <Link to="/" className={classes.breadCrumbText}>
            Material-UI
          </Link>
        </BreadCrumbLink>
        <BreadCrumbLink component="div" color="inherit">
          <Link to={customerPath} className={classes.breadCrumbText}>
            Customer
          </Link>
        </BreadCrumbLink>
        <Typography color="textPrimary">{prevCustomerData.name}</Typography>
      </Breadcrumbs>
      <div className={classes.contentContainer}>
        <div className={classes.horizontalSplit}>
          <div className={classes.customerText}>
            <Typography color="textPrimary" variant="h4">
              {prevCustomerData.name}
            </Typography>
          </div>
          <div className={classes.verticalSplit}>
            <Button
              color="primary"
              variant={'contained'}
              onClick={submitCustomerData}
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
              onClick={onClickDeleteCustomer}
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
