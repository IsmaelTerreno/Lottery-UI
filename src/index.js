import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import './index.scss';
import App from './containers/AppContainer';
import reportWebVitals from './reportWebVitals';
import { MainStore } from './redux/store/configureStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = MainStore();

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
