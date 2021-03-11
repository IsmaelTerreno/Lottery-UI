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
  Typography,  
} from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

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
  let delayEffectTime = 100;
  return(
    <TableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography  
                className={classes.title}
                variant="p"
              >
                Profit
              </Typography>
            </TableCell>
            <TableCell>
              <Typography  
                className={classes.title}
                variant="p"
              >
                Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography  
                className={classes.title}
                variant="p"
              >
                Block
              </Typography>
            </TableCell>
            <TableCell>
              <Typography  
                className={classes.title}
                variant="p"
              >
                Start date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography  
                className={classes.title}
                variant="p"
              >
                End date
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {winners.map((row, idx) => {
            delayEffectTime += 150;
            return (
            <TableRow key={row.address + '-'+ idx}>
              <TableCell >
                <Grow
                      in
                      style={{ transformOrigin: '0 0 0' }}
                      timeout={delayEffectTime} 
                  >
                    <Typography  
                      className={classes.title}
                      variant="p"
                    >
                      {row.amount}
                    </Typography>
                </Grow>
              </TableCell>
              <TableCell >
                <Grow
                      in
                      style={{ transformOrigin: '0 0 0' }}
                      timeout={delayEffectTime} 
                  >
                    <Typography  
                      className={classes.title}
                      variant="p"
                    >
                      {row.address}
                    </Typography>
                </Grow>
              </TableCell>
              <TableCell >
                <Grow
                      in
                      style={{ transformOrigin: '0 0 0' }}
                      timeout={delayEffectTime} 
                  >
                    <Typography  
                      className={classes.title}
                      variant="p"
                    >
                      {row.block}
                    </Typography>
                </Grow>
              </TableCell>
              <TableCell >
                <Grow
                    in
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={delayEffectTime} 
                >
                    <Typography  
                      className={classes.title}
                      variant="p"
                    >
                      {row.startDate}
                    </Typography>
                </Grow>
              </TableCell>
              <TableCell>
                <Grow
                    in
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={delayEffectTime} 
                >
                    <Typography  
                      className={classes.title}
                      variant="p"
                    >
                      {row.endDate}
                    </Typography>
                </Grow>
              </TableCell>
            </TableRow>
          )}
          )}
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
