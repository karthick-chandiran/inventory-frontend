import { useState, useEffect } from 'react';
import { getCustomer, deleteCustomer } from '../../api/customer';
import { useHistory, Link } from 'react-router-dom';
import CustomerTable from './CustomerTable';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customerCreatePath } from '../../utils/routepath';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    marginBottom: '20px',
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: 'var(--primary-color)',
  },
});

export default function ListCustomer() {
  const [customer, updateCustomer] = useState({
    isFetched: false,
    error: false,
    data: [],
  });

  const history = useHistory();
  const styles = useStyles();
  useEffect(() => {
    getCustomer().then((res) => {
      console.log(res);
      if (res.success) {
        updateCustomer({ isFetched: true, data: res.data || [] });
      } else {
        updateCustomer({ isFetched: true, error: true });
      }
    });
  }, []);

  const onClickDeleteCustomer = async (id) => {
    const status = await deleteCustomer(id);
    if (status.success) {
      const newCustomer = customer.data.filter((customer) => customer.id !== id);
      updateCustomer({ ...customer, data: newCustomer });
    } else{
      updateCustomer({ isFetched: true, error: true });
    }
  };
  if (!customer.isFetched) {
    return <div>Loading...</div>;
  }

  if (customer.error) {
    return (
      <div>
        Problem on Loading data. Please try again.
        <Link to="/">Home</Link>
      </div>
    );
  }

  if (!customer.length === 0) {
    return <div> No Customer Available </div>;
  }

  const onAddCustomerClick = () => {
    history.push(customerCreatePath);
  };

  return (
    <div>
      <header className={styles.header}>
        <Typography variant="h5">Customer</Typography>

        <Button
          className={styles.addButton}
          variant="contained"
          color="primary"
          onClick={onAddCustomerClick}
        >
          Add Customer
        </Button>
      </header>
      <CustomerTable data={customer.data} deleteCustomerFunc={onClickDeleteCustomer} />
    </div>
  );
}
