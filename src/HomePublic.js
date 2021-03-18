import React from 'react';
import PropTypes from 'prop-types';
import './HomePublic.sass';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Typography,
  Paper
} from '@material-ui/core';
import FlameAnimation from './FlameAnimation';
import CountDownDate from './CountDownDate';

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
  table: {
    minWidth: 650,
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
  logoNameApp1:{
    color: '#45adff',
  },
  logoNameApp2:{
    color: '#8beaff',
  },
  logoName:{
    textAlign: 'center',
    fontSize: '54px',
  }
}));

const HomePublic = ({
  isAdminRole
}) => {
  const classes = useStyles();
  return(
    <>
      <div 
        className={classes.root}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <FlameAnimation />
              <Typography variant="h1" component="h1" className={classes.logoName}>
                <span className={classes.logoNameApp1} >CRYPTO</span>  <span className={classes.logoNameApp2}>LOTTERY</span>
              </Typography>
            </Paper>
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
};

HomePublic.propTypes = {
  isAdminRole: PropTypes.bool,
};

export default HomePublic;
