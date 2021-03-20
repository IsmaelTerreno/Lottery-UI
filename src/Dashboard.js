import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import WinnersTable from "./WinnersTable";
import 'fontsource-roboto';
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
import { MAIN_APP_NAME } from "./config";
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
  }
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
  isAdminRole
}) => {
  const classes = useStyles();
  const classesToolbar = useToolbarStyles();
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
          <Button 
            color="inherit"
            onClick={()=>{
              loadDappMainData();
            }}>
              Use { MAIN_APP_NAME }
          </Button>
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
                <CountUp end={balancePrice} decimals={8} /> <span className={classes.balanceSymbol} >ETH</span> 
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
          <Grid item xs={12}>
          { 
            lastWinner && 
            <Toolbar>
              <Typography variant="h6" component="h6" className={classesToolbar.title}>
                Lastest winners
              </Typography>
            </Toolbar>
          }
          {
            winners.length > 0 && 
            <WinnersTable winners={winners}/>
          }
          </Grid>
        </Grid>
      </div>
    </>
  );
}

Dashboard.defaultProps = {
  balancePrice: 0,
  lastWinner: null,
  isAdminRole: false,
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
};

export default Dashboard;
