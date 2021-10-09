import { useState, useEffect } from 'react';
import { InventoryTextField } from '../common-components/textField';
import { makeStyles } from '@material-ui/core/styles';
import { validateEmail } from '../../utils/utils';

export const itemsFieldKeys = [
  {
    id: 'code',
    type: 'text',
  },
  {
    id: 'name',
    type: 'text',
  },
  {
    id: 'description',
    type: 'text',
  },
  {
    id: 'image_url',
    type: 'text',
  },
  {
    id: 'unit_size',
    type: 'number',
  },
  {
    id: 'unit',
    type: 'number',
  },
  {
    id: 'min_order_qty',
    type: 'number',
  },
  {
    id: 'max_order_qty',
    type: 'number',
  },
  {
    id: 'min_purchase_price',
    type: 'number',
  },
  {
    id: 'max_purchase_price',
    type: 'number',
  },
  {
    id: 'default_currency',
    type: 'text',
  },
  {
    id: 'preferred_vendor',
    type: 'number',
  },
  {
    id: 'timestamp',
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
  const [itemsError, updateErrorData] = useState({});
  const [itemsData, updateItemsData] = useState(defaultData);
  // useEffect(()=>{
  //   console.log('errors')
  //   updateErrorData(errors)
  // },[errors])
  
  const onInputChange = (e, inputType) => {
    const { name, value } = e.target;
    let isFormValid = false;
    if (!value) {
      updateErrorData({ ...itemsError, [name]: `${name} is required` });
    } else if (inputType === 'number' && isNaN(value)) {
      updateErrorData({
        ...itemsError,
        [name]: `${name} needs to be a number`,
      });
    } else if (inputType === 'email' && !validateEmail(value)) {
      updateErrorData({
        ...itemsError,
        [name]: `Enter a valid email`,
      });
    } else {
      const newItemsError = { ...itemsError };
      delete newItemsError[name];
      isFormValid = Object.keys(newItemsError).length === 0;
      updateErrorData({ ...newItemsError });
    }
    const newItemsData = { ...itemsData, [name]: value };
    onValueChange(newItemsData);
    updateItemsData(newItemsData);
  };
  return (
    <>
      {itemsFieldKeys.map(({ id, type }) => {
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
              value={itemsData[id] || ''}
              error={Boolean(itemsError[id])}
              helperText={itemsError[id] || ''}
            />
          </div>
        );
      })}
    </>
  );
}
