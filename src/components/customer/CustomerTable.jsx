import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { customerViewPath } from '../../utils/routepath';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#07689F',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CustomerTable(props) {
  const classes = useStyles();
  const { data, deleteCustomerFunc } = props;
  const history = useHistory();
  const [deleteingCustomer, updateDeleteingCustomer] = useState('');
  const onDeleteClick = (id) => {
    updateDeleteingCustomer(id);
    deleteCustomerFunc(id);
  };
  const onNameClick = (rowData) => {
    history.push({
      url: `${customerViewPath}/${rowData.id}`,
      state: {
        customerData: rowData,
      },
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Contact Person</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                component="th"
                scope="row"
                onClick={() => onNameClick(row)}
              >
                <Link
                  to={{
                    pathname: `${customerViewPath}/${row.id}`,
                    state: { customerData: row },
                  }}
                >
                  {row.name}{' '}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
                {row.contact_person}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  color="secondary"
                  variant={'contained'}
                  disabled={row.id === deleteingCustomer}
                  onClick={() => onDeleteClick(row.id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
