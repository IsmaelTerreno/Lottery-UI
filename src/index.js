import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import './index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './containers/DashboardContainer';
import HomePublic from './HomePublic';
import reportWebVitals from './reportWebVitals';
import { MainStore } from './redux/store/configureStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = MainStore();
const isLoging = () => {
  return false;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline/>
          { 
            isLoging() && <Dashboard />
          }
          { 
            !isLoging() && <HomePublic />
          }
        </>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
