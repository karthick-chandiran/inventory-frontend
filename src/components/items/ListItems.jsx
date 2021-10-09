import { useState, useEffect } from 'react';
import { getItems, deleteItems } from '../../api/items';
import { useHistory, Link } from 'react-router-dom';
import ItemsTable from './ItemsTable';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { itemsCreatePath } from '../../utils/routepath';

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

export default function ListItems() {
  const [items, updateItems] = useState({
    isFetched: false,
    error: false,
    data: [],
  });

  const history = useHistory();
  const styles = useStyles();
  useEffect(() => {
    getItems().then((res) => {
      console.log(res);
      if (res.success) {
        updateItems({ isFetched: true, data: res.data || [] });
      } else {
        updateItems({ isFetched: true, error: true });
      }
    });
  }, []);

  const onClickDeleteItems = async (id) => {
    const status = await deleteItems(id);
    if (status.success) {
      const newItems = items.data.filter((items) => items.id !== id);
      updateItems({ ...items, data: newItems });
    } else{
      updateItems({ isFetched: true, error: true });
    }
  };
  if (!items.isFetched) {
    return <div>Loading...</div>;
  }

  if (items.error) {
    return (
      <div>
        Problem on Loading data. Please try again.
        <Link to="/">Home</Link>
      </div>
    );
  }

  if (!items.length === 0) {
    return <div> No Items Available </div>;
  }

  const onAddItemsClick = () => {
    history.push(itemsCreatePath);
  };

  return (
    <div>
      <header className={styles.header}>
        <Typography variant="h5">Items</Typography>

        <Button
          className={styles.addButton}
          variant="contained"
          color="primary"
          onClick={onAddItemsClick}
        >
          Add Items
        </Button>
      </header>
      <ItemsTable data={items.data} deleteItemsFunc={onClickDeleteItems} />
    </div>
  );
}
