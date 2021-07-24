import { useState } from 'react';
import { useLocation, Redirect, useHistory, Fragment } from 'react-router-dom';
import { vendorPath } from '../../utils/routepath';
import {
  Typography,
  Breadcrumbs,
  Link as BreadCrumbLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { InventoryTextField } from '../common-components/textField';
import { deleteVendor, updateVendor } from '../../api/vendor';
import { Alert } from '@material-ui/lab';
import isEqual from 'lodash.isequal';
const errorMsg = 'Something went wrong. Please try again';
const successMsg = 'Vendor Details Added Successfully';

const vendorFieldKeys = [
  {
    id: 'address_2',
  },
  {
    id: 'vendor',
  },
  {
    id: 'account_name',
  },
  {
    id: 'gst_number',
  },
  {
    id: 'city',
  },
  {
    id: 'pin_code',
  },
  {
    id: 'fax_no',
  },
  {
    id: 'account_no',
  },
  {
    id: 'branch',
  },
  {
    id: 'description',
  },
  {
    id: 'contact_person',
  },
  {
    id: 'timezone',
  },
  {
    id: 'phone_no_2',
  },
  {
    id: 'bank_name',
  },
  {
    id: 'country',
  },
  {
    id: 'code',
  },
  {
    id: 'IFSC_code',
  },
  {
    id: 'pan_number',
  },
  {
    id: 'phone_no_1',
  },
  {
    id: 'email_id',
  },
  {
    id: 'name',
  },
  {
    id: 'ts',
  },
  {
    id: 'state',
  },
  {
    id: 'address_1',
  },
  {
    id: 'alternate_email_id',
  },
];
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
  fieldContainer: {
    marginBottom: '20px',
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
  const [vendorError, updateErrorData] = useState({});
  const [prevVendorData, updatePrevVendorData] = useState(data);
  const [vendorData, updateVendorData] = useState(data);
  const [isChanged, updateIsDataChanged] = useState(false);
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      updateErrorData({ ...vendorError, [name]: `${name} is required` });
    } else {
      const newVendorError = { ...vendorError };
      delete newVendorError[name];
      updateErrorData({ ...newVendorError });
    }
    const newVendorData = { ...vendorData, [name]: value };
    updateIsDataChanged(!isEqual(prevVendorData, newVendorData));
    updateVendorData(newVendorData);
  };

  const onClickDeleteVendor = async () => {
    updateErrorStatus({ status: 'inprogress' });
    const status = await deleteVendor(vendorData.id);
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
                Object.keys(vendorError).length > 0
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
          {vendorFieldKeys.map(({ id }) => {
            return (
              <div className={classes.fieldContainer} key={'view' + id}>
                <InventoryTextField
                  required
                  size="medium"
                  onChange={onInputChange}
                  name={id}
                  label={id.replaceAll('_', ' ').toUpperCase()}
                  value={vendorData[id]}
                  error={Boolean(vendorError[id])}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
