import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import WinnersTable from "./WinnersTable";
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { 
  Button,
  Paper,
  Grid,
  Typography,
  AppBar,
  Toolbar, 
} from '@material-ui/core';
import CountUp from 'react-countup';
import { MAIN_APP_NAME } from "./config";
import { LotteryContract, loginDapp } from "./lib/DappUtils";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}));

const App = ({
  startLottery, 
  pickWinner,
  balancePrice,
  lastWinner,
  enterIntoLottery,
  getLastWinner,
  getBalancePrice,
  findLastWinners,
  winners,
}) => {
  const classes = useStyles();
  return(
    <>
      <CssBaseline />
      <div 
        className={classes.root}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography  
              className={classes.title}
              variant="h6"
            >
              { MAIN_APP_NAME }
            </Typography>
            <Button 
              color="inherit"
              onClick={startLottery}
            >
              Start lottery
            </Button>
            <Button 
              color="inherit"
              onClick={pickWinner}>
                Pick winner
            </Button>
            <Button 
              color="inherit"
              onClick={async ()=>{
                await loginDapp();
                setTimeout(async() => {
                  if (LotteryContract){
                    await getBalancePrice();
                    await getLastWinner();
                    await findLastWinners();
                  }  
                }, 1500);
              }}>
                Use { MAIN_APP_NAME }
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h3" component="h2" gutterBottom>
                <CountUp end={balancePrice} decimals={2} /> ETH
              </Typography>
              { 
                lastWinner && 
                <Typography variant="subtitle1" component="p" gutterBottom>
                  Last winner address { lastWinner.address }
                </Typography>
              }
              <Button onClick={enterIntoLottery} variant="contained" color="primary">
                Participate
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <WinnersTable winners={winners}/>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

App.defaultProps = {
  balancePrice: 0,
  lastWinner: null,
};

App.propTypes = {
  balancePrice: PropTypes.number,
  lastWinner: PropTypes.object,
  startLottery: PropTypes.func,
  pickWinner: PropTypes.func,
  enterIntoLottery: PropTypes.func,
  getLastWinner: PropTypes.func,
  getBalancePrice: PropTypes.func,
  findLastWinners: PropTypes.func,
  winners: PropTypes.array,
};

export default App;
