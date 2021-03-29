import { CONTRACT_ADDRESS } from '../config';
import Web3 from 'web3';
import contract_abi from '../build/contracts/Lottery.json';

export let LotteryContract;
export let web3;
export let accounts;

export const loadDapp = async (callbackFn, onAccountsChanged) => {
  const { ethereum } = window;
  if(!ethereum.isConnected()) {
    window.location.reload();
  }
  if ( ethereum ) {
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(()=>{
      web3 = new Web3(ethereum);
      web3.eth.getAccounts().then((walletAccounts)=> {
        accounts = walletAccounts;        
      });
      // User has allowed account access to DApp...
      LotteryContract = new web3.eth.Contract(contract_abi.abi, CONTRACT_ADDRESS); 
      setTimeout(() => {
        callbackFn();
      }, 500);
    })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    ethereum.on('accountsChanged', (accounts) => {
      onAccountsChanged();
    });
    
    ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  } else {
    alert('You have to install MetaMask !');
  }
};

export const loadDappPublic = async (callbackFn) => {
  const { ethereum } = window;
  setTimeout(() => {
    if(!ethereum.isConnected()) {
      window.location.reload();
    }
  }, 300);
  if ( ethereum ) {
    web3 = new Web3(ethereum);
      accounts = ['0x6F8AeEdc26e1B8251bF9E666bEF3C58354448707'];
      // User has allowed account access to DApp...
      LotteryContract = new web3.eth.Contract(contract_abi.abi, CONTRACT_ADDRESS);
      callbackFn();
  } else {
    alert('You have to install MetaMask !');
  }
};