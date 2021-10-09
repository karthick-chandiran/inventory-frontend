import { useState, useEffect } from 'react';
import { InventoryTextField } from '../common-components/textField';
import { makeStyles } from '@material-ui/core/styles';
import { validateEmail } from '../../utils/utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const customerFieldKeys = [
  {
    id: 'code',
    type: 'text',
  },
  {
    id: 'agency_name',
    type: 'text',
  },
  {
    id: 'contact_person',
    type: 'text',
  },
  {
    id: 'address_1',
    type: 'text',
  },
  {
    id: 'address_2',
    type: 'text',
  },
  {
    id: 'pin_code',
    type: 'number',
  },
  {
    id: 'state',
    type: 'text',
  },
  {
    id: 'country',
    type: 'text',
  },
  {
    id: 'timezone',
    type: 'text',
  },
  {
    id: 'max_purchase_price',
    type: 'number',
  },
  {
    id: 'phone_no_1',
    type: 'number',
  },
  {
    id: 'phone_no_2',
    type: 'number',
  },
  {
    id: 'fax_number',
    type: 'number',
  },
  {
    id: 'gst_number',
    type: 'number',
  },
  {
    id: 'email_id',
    type: 'email',
  },
  {
    id: 'alternate_email_id',
    type: 'email',
  },
  {
    id: 'status_enum',
    type: 'select',
    options: [{ value: 'Active' }, { value: 'Lead' }, { value: 'Old' }]
  },
  {
    id: 'ts',
    type: 'text',
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
  const [customerError, updateErrorData] = useState({});
  const [customerData, updateCustomerData] = useState(defaultData);
  // useEffect(()=>{
  //   console.log('errors')
  //   updateErrorData(errors)
  // },[errors])

  const onInputChange = (e, inputType) => {
    const { name, value } = e.target;
    let isFormValid = false;
    if (!value) {
      updateErrorData({ ...customerError, [name]: `${name} is required` });
    } else if (inputType === 'number' && isNaN(value)) {
      updateErrorData({
        ...customerError,
        [name]: `${name} needs to be a number`,
      });
    } else if (inputType === 'email' && !validateEmail(value)) {
      updateErrorData({
        ...customerError,
        [name]: `Enter a valid email`,
      });
    } else {
      const newCustomerError = { ...customerError };
      delete newCustomerError[name];
      isFormValid = Object.keys(newCustomerError).length === 0;
      updateErrorData({ ...newCustomerError });
    }
    const newCustomerData = { ...customerData, [name]: value };
    onValueChange(newCustomerData);
    updateCustomerData(newCustomerData);
  };
  return (
    <>
      {customerFieldKeys.map(({ id, type, options = [] }) => {
        if (type === 'select') {
          return <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              value={customerData[id] || ''}
              name={id}
              labelId="status"
              id="status-icon-select"
              label="status"
              onChange={(e) => onInputChange(e, type)}
            >{options.map((option) => <MenuItem value={option.value}>{option.value}</MenuItem>)}
            </Select>
          </FormControl>
        }
        return (
          <div className={classes.fieldContainer} key={'view' + id}>
            <InventoryTextField
              type={type}
              required
              size="medium"
              onBlur={(e) => onInputChange(e, type)}
              onChange={(e) => onInputChange(e, type)}
              name={id}
              label={id.replaceAll('_', ' ').toUpperCase()}
              value={customerData[id] || ''}
              error={Boolean(customerError[id])}
              helperText={customerError[id] || ''}
            />
          </div>
        );
      })}
    </>
  );
}
