import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { createItems } from '../../api/items';
import FormFields, { itemsFieldKeys } from './FormFields';
import { Link } from 'react-router-dom';
import { itemsPath } from '../../utils/routepath';
import { validateEmail } from '../../utils/utils';
const successMsg = 'Items Details Added Successfully';
const errorMsg = 'Problem in adding items. Check the values';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  header: {
    display: 'flex',
    marginBottom: '20px',
  },
  backButton: {
    marginLeft: 'auto',
  },
  backLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function CreateItems() {
  const [itemsData, updateItemsData] = useState({});
  const [isFormValid, updateIsFormValid] = useState(false);
  const [formFieldErrors, updateFormFieldErrors] = useState({});
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (newData ) => {
    const isFormValid = isFormValidFun(newData)
    updateIsFormValid(isFormValid);
    updateItemsData(newData);
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
  const submitItemsData = async (e) => {
    e.preventDefault();
    updateErrorStatus({ status: 'inprogress' });
    // let newFormFieldErrors = {};
    // itemsFieldKeys.forEach(({ id, type: inputType }) => {
    //   const value = itemsData[id];
    //   if (!value) {
    //     newFormFieldErrors = {
    //       ...newFormFieldErrors,
    //       [id]: `${id} is required`,
    //     };
    //   } else if (inputType === 'number' && isNaN(value)) {
    //     newFormFieldErrors = {
    //       ...newFormFieldErrors,
    //       [id]: `${id} needs to be a number`,
    //     };
    //   } else if (inputType === 'email' && !validateEmail(value)) {
    //     newFormFieldErrors = {
    //       ...newFormFieldErrors,
    //       [id]: `Enter a valid email`,
    //     };
    //   }
    // });
    // if (Object.keys(newFormFieldErrors).length > 0) {
    //   updateFormFieldErrors(newFormFieldErrors);
    // } else {
      const createStatus = await createItems(itemsData);
      if (createStatus.success) {
        updateErrorStatus({ status: 'success', message: successMsg });
        setTimeout(() => {
          updateErrorStatus({ status: 'not_set' });
        }, 5000);
      } else {
        updateErrorStatus({ status: 'error', message: errorMsg });
      }
    
  };

  return (
    <div>
      {(errorStatus.status === 'success' || errorStatus.status === 'error') && (
        <Alert severity={errorStatus.status}>{errorStatus.message}</Alert>
      )}

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitItemsData}
      >
        <header className={classes.header}>
          <Typography variant="h5">Create Items</Typography>
        </header>
        <div>
          <FormFields onValueChange={onInputChange} errors={formFieldErrors} />
        </div>
        <Button
          disabled={!isFormValid || errorStatus.status === 'inprogress'}
          variant="contained"
          size="medium"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.backButton}
        >
          <Link
            to={itemsPath}
            className={classes.backLink}
          >{String.raw`Cancel`}</Link>
        </Button>
      </form>
    </div>
  );
}
