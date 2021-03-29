import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './HomePublic.sass';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Typography,
  Paper,
  Button
} from '@material-ui/core';
import FlameAnimation from './FlameAnimation';
import CountDownDate from './CountDownDate';
import { MAIN_APP_NAME } from "./config";
import ehtLogo from './img/ethereum.png';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#23292e',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tableBtn: {
    marginTop: '5px',
    marginBottom: '35px',
  },
  logoNameApp1:{
    color: '#45adff',
  },
  logoNameApp2:{
    color: '#8beaff',
  },
  logoName:{
    textAlign: 'center',
    fontSize: '54px',
  },
  balanceLabel:{
    color: '#6876e6',
    fontSize:'70px',
    marginBottom:'10px',
    marginTop:'10px',
    textAlign: 'center',
  },
  balanceSymbol:{
    fontSize:'38px'
  },
  ehtLogo:{
    height: '53px',
  },
  balanceTitle:{
    textAlign: 'center',
    letterSpacing: '2px',
	  textTransform: 'uppercase',
    color: '#ccc',
    fontSize: '20px',
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
    }
  },
}));

const HomePublic = ({
  balancePrice,
  isAdminRole,
  loadDappMainData,
  loginToApp,
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadDappMainData();
  });
  return(
    <>
      <div 
        className={classes.root}
      >
        <Grid 
          container 
          spacing={3}             
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <FlameAnimation />
              <Typography variant="h1" component="h1" className={classes.logoName}>
                <span className={classes.logoNameApp1} >CRYPTO</span>  <span className={classes.logoNameApp2}>LOTTERY</span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography 
                variant="h6" 
                component="h6" 
                gutterBottom
                className={classes.balanceTitle}
              >
                Current accumulated price
              </Typography>
              <Typography 
                className={classes.balanceLabel}   
                variant="h3" 
                component="h2" 
                gutterBottom
              >
                <img alt={MAIN_APP_NAME} src={ehtLogo} className={classes.ehtLogo} />
                <CountUp end={balancePrice} decimals={8} /> <span className={classes.balanceSymbol} >ETH</span> 
              </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid 
              container            
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.tableBtn}
            >
              <Button onClick={loginToApp} className={classes.buyTicketBtn} variant="contained" color="primary">
                Let's buy tickets
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CountDownDate 
              timeTillDate="05 26 2019, 6:00 am" 
            />
          </Grid>
        </Grid>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
    </>
  );
}

HomePublic.defaultProps = {
  isAdminRole: false,
  balancePrice: 58.89,
  loadDappMainData: () => {}
};

HomePublic.propTypes = {
  isAdminRole: PropTypes.bool,
  balancePrice: PropTypes.number,
  loadDappMainData:  PropTypes.func,
  loginToApp: PropTypes.func,
};

export default HomePublic;