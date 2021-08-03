import { useState } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { vendorPath } from '../../utils/routepath';
import {
  Typography,
  Breadcrumbs,
  Link as BreadCrumbLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormFields from './FormFields';
import { deleteVendor, updateVendor } from '../../api/vendor';
import { Alert } from '@material-ui/lab';
import isEqual from 'lodash.isequal';
const errorMsg = 'Something went wrong. Please try again';
const successMsg = 'Vendor Details Added Successfully';

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
  vendorText: {
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
export default function DisplayVendorDetails(props) {
  const location = useLocation();
  const history = useHistory();
  const { vendorData: data = {} } = location.state || {};
  const [prevVendorData, updatePrevVendorData] = useState(data);
  const [isFormValid, updateIsFormValid] = useState(false);
  const [vendorData, updateVendorData] = useState(data);
  const [isChanged, updateIsDataChanged] = useState(false);
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (newVendorData,isValid) => {
    updateVendorData(newVendorData)
    updateIsFormValid(isValid)
    updateIsDataChanged(!isEqual(prevVendorData, newVendorData));
  };

  const onClickDeleteVendor = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const status = await deleteVendor(data.id);
    if (status.success) {
      history.push(vendorPath);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  const submitVendorData = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const { id, ...payload } = vendorData;
    const updateStatus = await updateVendor({ ...payload }, id);
    if (updateStatus.success) {
      updatePrevVendorData(vendorData);
      updateIsDataChanged(false);
      updateErrorStatus({ status: 'success', message: successMsg });
      setTimeout(() => {
        updateErrorStatus({ status: 'not_set' });
      }, 5000);
    } else {
      updateErrorStatus({ status: 'error', message: errorMsg });
    }
  };

  if (!data.id) return <Redirect to={vendorPath} />;
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadCrumbLink component="div" color="inherit">
          <Link to="/" className={classes.breadCrumbText}>
            Material-UI
          </Link>
        </BreadCrumbLink>
        <BreadCrumbLink component="div" color="inherit">
          <Link to={vendorPath} className={classes.breadCrumbText}>
            Vendors
          </Link>
        </BreadCrumbLink>
        <Typography color="textPrimary">{prevVendorData.name}</Typography>
      </Breadcrumbs>
      <div className={classes.contentContainer}>
        <div className={classes.horizontalSplit}>
          <div className={classes.vendorText}>
            <Typography color="textPrimary" variant="h4">
              {prevVendorData.name}
            </Typography>
          </div>
          <div className={classes.verticalSplit}>
            <Button
              color="primary"
              variant={'contained'}
              onClick={submitVendorData}
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
              onClick={onClickDeleteVendor}
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
