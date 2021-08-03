import { useState, useEffect } from 'react';
import { InventoryTextField } from '../common-components/textField';
import { makeStyles } from '@material-ui/core/styles';
import { validateEmail } from '../../utils/utils';

export const vendorFieldKeys = [
  {
    id: 'address_2',
    type: 'text',
  },
  {
    id: 'vendor',
    type: 'text',
  },
  {
    id: 'account_name',
    type: 'text',
  },
  {
    id: 'gst_number',
    type: 'number',
  },
  {
    id: 'city',
    type: 'text',
  },
  {
    id: 'pin_code',
    type: 'number',
  },
  {
    id: 'fax_no',
    type: 'number',
  },
  {
    id: 'account_no',
    type: 'number',
  },
  {
    id: 'branch',
    type: 'text',
  },
  {
    id: 'description',
    type: 'text',
  },
  {
    id: 'contact_person',
    type: 'number',
  },
  {
    id: 'timezone',
    type: 'text',
  },
  {
    id: 'phone_no_2',
    type: 'number',
  },
  {
    id: 'bank_name',
    type: 'text',
  },
  {
    id: 'country',
    type: 'text',
  },
  {
    id: 'code',
    type: 'text',
  },
  {
    id: 'IFSC_code',
    type: 'text',
  },
  {
    id: 'pan_number',
    type: 'number',
  },
  {
    id: 'phone_no_1',
    type: 'number',
  },
  {
    id: 'email_id',
    type: 'email',
  },
  {
    id: 'name',
    type: 'text',
  },
  {
    id: 'ts',
    type: 'text',
  },
  {
    id: 'state',
    type: 'text',
  },
  {
    id: 'address_1',
    type: 'text',
  },
  {
    id: 'alternate_email_id',
    type: 'email',
  },
];

const useStyles = makeStyles({
  fieldContainer: {
    marginBottom: '20px',
  },
});
export default function FormFields(props) {
  const classes = useStyles();
  const { onValueChange, data: defaultData = {}, errors = {} } = props;
  const [vendorError, updateErrorData] = useState(errors);
  const [vendorData, updateVendorData] = useState(defaultData);
  useEffect(()=>{
    updateErrorData(errors)
  },[errors])
  const onInputChange = (e, inputType) => {
    const { name, value } = e.target;
    let isFormValid = false;
    if (!value) {
      updateErrorData({ ...vendorError, [name]: `${name} is required` });
    } else if (inputType === 'number' && isNaN(value)) {
      updateErrorData({
        ...vendorError,
        [name]: `${name} needs to be a number`,
      });
    } else if (inputType === 'email' && !validateEmail(value)) {
      updateErrorData({
        ...vendorError,
        [name]: `Enter a valid email`,
      });
    } else {
      const newVendorError = { ...vendorError };
      delete newVendorError[name];
      isFormValid = Object.keys(newVendorError).length === 0;
      updateErrorData({ ...newVendorError });
    }
    const newVendorData = { ...vendorData, [name]: value };
    onValueChange(newVendorData, isFormValid);
    updateVendorData(newVendorData);
  };
  return (
    <>
      {vendorFieldKeys.map(({ id, type }) => {
        return (
          <div className={classes.fieldContainer} key={'view' + id}>
            <InventoryTextField
              type={type}
              required
              size="medium"
              onChange={(e) => onInputChange(e, type)}
              name={id}
              label={id.replaceAll('_', ' ').toUpperCase()}
              value={vendorData[id] || ''}
              error={Boolean(vendorError[id])}
              helperText={vendorError[id] || ''}
            />
          </div>
        );
      })}
    </>
  );
}
