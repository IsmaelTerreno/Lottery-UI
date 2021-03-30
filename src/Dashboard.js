import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import WinnersTable from "./WinnersTable";
import PositionsProbabilityPie from './PositionsProbabilityPie';
import 'fontsource-roboto';
import CountDownDate from './CountDownDate';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  Paper,
  Grid,
  Typography,
  AppBar,
  Toolbar, 
} from '@material-ui/core';
import CountUp from 'react-countup';
import { MAIN_APP_NAME, FORMAT_DATE_TIME } from "./config";
import ehtLogo from './img/ethereum.png';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px',
    height: '1200px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:'56px',
    //backgroundImage: 'linear-gradient(225deg, #23292e 0%, #121314 100%)',
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
  balanceLabel:{
    color: '#6876e6',
    fontSize:'70px',
    marginBottom:'10px',
    marginTop:'10px',
  },
  balanceSymbol:{
    fontSize:'38px'
  },
  ehtLogo:{
    height: '170px'
  },
  balanceSubtitle:{
    
  },
  participateBtn:{
    borderRadius: '24px',
    width: '315px',
    marginTop: '20px',
    marginBottom: '20px',
    height: '48px',
    background: 'linear-gradient(180deg ,#fff, #e5dbff)',
    color: '#5930ce',
    fontWeight: 'bold',
    fontSize: '21px',
    textTransform: 'capitalize',
  },
  countDownDate:{
    height: '300px',
    '& .countdown-wrapper':{
      marginTop:'50px'
    }  
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    textAlign:'center'
  },
}));

const Dashboard = ({
  startLottery, 
  pickWinner,
  balancePrice,
  lastWinner,
  enterIntoLottery,
  loadDappMainData,
  winners,
  isAdminRole,
  lotteryInfo,
  countCurrentPositions,
  countAllPositions,
}) => {
  const classes = useStyles();
  const classesToolbar = useToolbarStyles();
  useEffect(() => {
    loadDappMainData();
  },[loadDappMainData]);
  return(
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography  
            className={classes.title}
            variant="h6"
          >
            { MAIN_APP_NAME }
          </Typography>
          {
            isAdminRole && 
            <Button 
              color="inherit"
              onClick={startLottery}
            >
              Start lottery
            </Button>
          }
          {
            isAdminRole && 
            <Button 
              color="inherit"
              onClick={pickWinner}
            >
              Pick winner
            </Button>
          }
        </Toolbar>
      </AppBar>
      <div 
        className={classes.root}
      >
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>    
              <img alt={MAIN_APP_NAME} src={ehtLogo} className={classes.ehtLogo} />
              <Typography 
                className={classes.balanceLabel}   
                variant="h3" 
                component="h2" 
                gutterBottom
              >
                <CountUp end={lotteryInfo.balance} decimals={8} /> <span className={classes.balanceSymbol} >ETH</span> 
              </Typography>
              <Typography 
                className={classes.balanceSubtitle}  
                variant="h5" 
                component="h5" 
                gutterBottom
              >
                Current accumulated prize
              </Typography>
              <Button 
                className={classes.participateBtn}  
                variant="outlined" 
                onClick={enterIntoLottery} 
                color="primary"
              >
                Buy ticket
              </Button>
            </Paper>
          </Grid>
          { 
            lotteryInfo && 
            <Grid item xs={12} lg={6}>
              <Paper>
                { 
                  lotteryInfo && 
                  lotteryInfo.endDate &&
                  <CountDownDate 
                    timeTillDate={lotteryInfo.endDate}
                    timeFormat={FORMAT_DATE_TIME} 
                    classNameCustom={classes.countDownDate}
                  />
                }
              </Paper>
            </Grid> 
          }
          { 
            lotteryInfo && 
            lotteryInfo.endDate &&
            <Grid item xs={12} lg={6}>
              <Paper>
                <PositionsProbabilityPie
                  countPosition={countCurrentPositions}
                  totalPositions={countAllPositions - countCurrentPositions}
                />
              </Paper>
            </Grid> 
          }
          {
            lastWinner &&
            winners.length > 0 &&
            <Grid item xs={12}>
              <Paper>
                  <Toolbar>
                    <Typography variant="h6" component="h6" className={classesToolbar.title}>
                      Lastest winners
                    </Typography>
                  </Toolbar>
                  <WinnersTable winners={winners}/>
              </Paper>
            </Grid>
          }
        </Grid>
      </div>
    </>
  );
}

Dashboard.defaultProps = {
  balancePrice: 0,
  lastWinner: null,
  isAdminRole: false,
  lotteryInfo: {
    balance: 0,
  },
  countCurrentPositions: 0,
  countAllPositions: 0
};

Dashboard.propTypes = {
  balancePrice: PropTypes.number,
  lastWinner: PropTypes.object,
  startLottery: PropTypes.func,
  pickWinner: PropTypes.func,
  enterIntoLottery: PropTypes.func,
  loadDappMainData: PropTypes.func,
  winners: PropTypes.array,
  isAdminRole: PropTypes.bool,
  lotteryInfo: PropTypes.object,
  countCurrentPositions: PropTypes.number,
  countAllPositions: PropTypes.number,
};

export default Dashboard;
