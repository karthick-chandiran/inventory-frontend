import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { createCustomer } from '../../api/customer';
import FormFields, { customerFieldKeys } from './FormFields';
import { Link } from 'react-router-dom';
import { customerPath } from '../../utils/routepath';
import { validateEmail } from '../../utils/utils';
const successMsg = 'Customer Details Added Successfully';  
const errorMsg = 'Problem in adding customer. Check the values';

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

export default function CreateCustomer() {
  const [customerData, updateCustomerData] = useState({});
  const [isFormValid, updateIsFormValid] = useState(false);
  const [formFieldErrors, updateFormFieldErrors] = useState({});
  const [errorStatus, updateErrorStatus] = useState({
    status: 'not_set',
  });
  const classes = useStyles();
  const onInputChange = (newData ) => {
    const isFormValid = isFormValidFun(newData)
    updateIsFormValid(isFormValid);
    updateCustomerData(newData);
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
  const submitCustomerData = async (e) => {
    e.preventDefault();
    updateErrorStatus({ status: 'inprogress' });
      const createStatus = await createCustomer(customerData);
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
        onSubmit={submitCustomerData}
      >
        <header className={classes.header}>
          <Typography variant="h5">Create Customer</Typography>
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
            to={customerPath}
            className={classes.backLink}
          >{String.raw`Cancel`}</Link>
        </Button>
      </form>
    </div>
  );
}
