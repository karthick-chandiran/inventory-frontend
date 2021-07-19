import { useState, useEffect } from 'react';
import { getVendors, deleteVendor } from '../../api/vendor';
import { useHistory, Link } from 'react-router-dom';
import VendorTable from './VendorTable';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { vendorCreatePath } from '../../utils/routepath';

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

export default function ListVendor() {
  const [vendors, updateVendors] = useState({
    isFetched: false,
    error: false,
    data: [],
  });

  const history = useHistory();
  const styles = useStyles();
  useEffect(() => {
    getVendors().then((res) => {
      console.log(res);
      if (res.success) {
        updateVendors({ isFetched: true, data: res.data || [] });
      } else {
        updateVendors({ isFetched: true, error: true });
      }
    });
  }, []);

  const onClickDeleteVendor = async (id) => {
    const status = await deleteVendor(id);
    if (status.success) {
      const newVendors = vendors.data.filter((vendor) => vendor.id !== id);
      updateVendors({ ...vendors, data: newVendors });
    } else{
      updateVendors({ isFetched: true, error: true });
    }
  };
  if (!vendors.isFetched) {
    return <div>Loading...</div>;
  }

  if (vendors.error) {
    return (
      <div>
        Problem on Loading data. Please try again.
        <Link to="/">Home</Link>
      </div>
    );
  }

  if (!vendors.length === 0) {
    return <div> No Vendors Available </div>;
  }

  const onAddVendorClick = () => {
    history.push(vendorCreatePath);
  };

  return (
    <div>
      <header className={styles.header}>
        <Typography variant="h5">Vendors</Typography>

        <Button
          className={styles.addButton}
          variant="contained"
          color="primary"
          onClick={onAddVendorClick}
        >
          Add Vendor
        </Button>
      </header>
      <VendorTable data={vendors.data} deleteVendorFunc={onClickDeleteVendor} />
    </div>
  );
}
