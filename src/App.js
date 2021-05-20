import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/DashboardContainer';
import HomePublic from './containers/HomePublicContainer';

const App = ({
    isLogin,
}) => {

  return (
    <>
      <CssBaseline/>
      { isLogin && <Dashboard /> }
      { !isLogin && <HomePublic /> }
    </>
  );
}

App.defaultProps = {
    isLogin: false,
};

App.propTypes = {
    isLogin: PropTypes.bool,
};

export default App;
