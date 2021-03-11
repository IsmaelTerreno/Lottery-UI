import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import './index.css';
import App from './containers/AppContainer';
import reportWebVitals from './reportWebVitals';
import { MainStore } from './redux/store/configureStore';
import { loadDapp, LotteryContract, loginDapp } from "./lib/DappUtils";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = MainStore();
loadDapp();
const checkDappSession = () =>{
  setInterval(async() => {
    if (!LotteryContract){
      loginDapp();
    }  
  }, 2000);
}
//checkDappSession();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
