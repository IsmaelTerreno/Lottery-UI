import React, {useEffect, useState} from 'react';
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
import {MAIN_APP_NAME, FORMAT_DATE_TIME, LOTTERY_STATE_CLOSED} from "./config";
import ehtLogo from './img/ethereum.png';
import Tour from "reactour";
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px',
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
    fontSize: '20px',
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
  buyTicketBtn:{
    height: '53px',
    color: '#060e22',
    background: '#fbc509',
    fontSize: '20px',
    margin: '0 auto',
    '&:hover':{
      background: '#ffcf29',
      transition: 'all .3s ease-in-out',
    },
    marginBottom:'18px',
    marginTop: '18px',
  },
  helpTourBtn:{
    '&:hover':{
      cursor: 'pointer',
      transition: 'all .3s ease-in-out',
    },
  },
  balanceTitle:{
    textAlign: 'center',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#ccc',
    fontSize: '20px',
    padding: "40px"
  },
  buyToSeeStatus:{
    textAlign: 'center',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#ccc',
    fontSize: '20px',
    padding: "135px 40px 135px 40px"
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
  const [ isTourOpen, setIsTourOpen ] = useState(true);
  const tutorialStyle= {
    color: '#060e22',
  };
  const steps = [
    {
      selector: '[data-tut="current-prize-dashboard"]',
      content: ()=>(
        <Typography
          variant="body2" 
          component="p" 
          gutterBottom
          style={tutorialStyle}
        >
          This is the current prize and will increase as people join the ticket pool.
        </Typography>
      ),
    },
    {
      selector: '[data-tut="buy-ticket-dashboard"]',
      content: ()=>(
        <Typography 
          style={tutorialStyle}
          variant="body2" 
          component="p" 
          gutterBottom
        >
          Buy tickets to have a better chance of winning the current prize, it's fast and incredibly easy!
        </Typography>
      ),
    },
    {
      selector: '[data-tut="countdown-draw-dashboard"]',
      content: ()=>(
        <Typography 
          style={tutorialStyle}
          variant="body2" 
          component="p" 
          gutterBottom
        >
          This is the next countdown draw to receive the current current prize, it will reset after every draw done.
        </Typography>
      ),
    },
    {
      selector: '[data-tut="tickets-section-dashboard"]',
      content: ()=>(
        <Typography 
          style={tutorialStyle}
          variant="body2" 
          component="p" 
          gutterBottom
        >
          Here's information on how many tickets you have and your chances of winning based on your purchased tickets.
        </Typography>
      ),
    },
    {
      selector: '[data-tut="latest-winners-dashboard"]',
      content: ({goTo})=>(
        <Typography 
          style={tutorialStyle}
          variant="body2" 
          component="p" 
          gutterBottom
          onClick={()=>{
            if(isTourOpen){
              goTo(1);
              setIsTourOpen(false);
            }
          }}
        >
          This is the information of the last lucky winners registered in the blockchain where it will always be updated for each draw.
        </Typography>
      ),
    },
  ];
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
          <HelpIcon
            className={classes.helpTourBtn}
            onClick={()=> setIsTourOpen(true)}
          />
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
                className={classes.balanceSubtitle}  
                variant="h5" 
                component="h5" 
                gutterBottom
              >
                Current prize
              </Typography>
              <Typography 
                className={classes.balanceLabel}   
                variant="h3" 
                component="h2" 
                gutterBottom
                data-tut="current-prize-dashboard"
              >
                <CountUp end={balancePrice} decimals={8} /> <span className={classes.balanceSymbol} >ETH</span> 
              </Typography>
              <Button 
                className={classes.buyTicketBtn} 
                variant="contained" 
                color="primary"
                onClick={() => (lotteryInfo) ? enterIntoLottery(lotteryInfo.state) : null}
                data-tut="buy-ticket-dashboard"
              >
                Buy ticket
              </Button>
            </Paper>
          </Grid>
          { 
            lotteryInfo && 
            <Grid item xs={12} lg={6}>
              <Paper data-tut="countdown-draw-dashboard">
                { 
                  lotteryInfo && 
                  lotteryInfo.endDate &&
                  <CountDownDate 
                    timeTillDate={lotteryInfo.endDate}
                    timeFormat={FORMAT_DATE_TIME} 
                    classNameCustom={classes.countDownDate}
                  />
                }
                {
                  lotteryInfo &&
                  !lotteryInfo.startDate &&
                  <Typography
                      variant="h3"
                      component="h3"
                      gutterBottom
                      className={classes.balanceTitle}
                  >
                    Next counter will be ready soon here.
                  </Typography>
                }
              </Paper>
            </Grid> 
          }
          <Grid item xs={12} lg={6}>
            <Paper data-tut="tickets-section-dashboard">
              {
                lotteryInfo &&
                lotteryInfo.endDate &&
                countCurrentPositions > 0 &&
                <PositionsProbabilityPie
                    countPosition={countCurrentPositions}
                    totalPositions={countAllPositions - countCurrentPositions}
                />
              }
              {
                lotteryInfo &&
                lotteryInfo.state !== LOTTERY_STATE_CLOSED &&
                countCurrentPositions === 0 &&
                <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    className={classes.buyToSeeStatus}
                >
                  Buy a ticket to see more information about the pool here.
                </Typography>
              }
            </Paper>
          </Grid>
          {
            lastWinner &&
            winners.length > 0 &&
            <Grid item xs={12} data-tut="latest-winners-dashboard">
              <Paper>
                  <Toolbar>
                    <Typography variant="h6" component="h6" className={classesToolbar.title}>
                      Latest Winners
                    </Typography>
                  </Toolbar>
                  <WinnersTable winners={winners}/>
              </Paper>
            </Grid>
          }
        </Grid>
      </div>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={()=> setIsTourOpen(false)} />
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
