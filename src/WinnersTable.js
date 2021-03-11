import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,  
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const WinnersTable = ({
  winners,
}) => {
  const classes = useStyles();
  return(
    <TableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start date</TableCell>
            <TableCell>End date</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {winners.map((row, idx) => (
            <TableRow key={row.address + '-'+ idx}>
              <TableCell >
                {row.startDate}
              </TableCell>
              <TableCell>
                {row.endDate}
              </TableCell>
              <TableCell >
                {row.address}
              </TableCell>
              <TableCell >
                {row.block}
              </TableCell>
              <TableCell >
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

WinnersTable.defaultProps = {
  winners: [],
};

WinnersTable.propTypes = {
  winners: PropTypes.array,
};

export default WinnersTable;
