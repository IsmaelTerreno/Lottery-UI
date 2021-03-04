import { CONTRACT_ADDRESS } from '../config';
import Web3 from 'web3';
import contract_abi from '../build/contracts/Lottery.json';

export let LotteryContract;
export let web3;
export let accounts;

export const loadDapp = async () => {
  // Modern DApp Browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try { 
      window.ethereum.enable().then(async() =>{
          accounts = await web3.eth.getAccounts();
          // User has allowed account access to DApp...
          LotteryContract = new web3.eth.Contract(contract_abi.abi, CONTRACT_ADDRESS);
      });
      window.ethereum.on('accountsChanged', (chainId) => {
        window.location.reload();
      });
    } catch(e) {
      // User has denied account access to DApp...
      window.location.reload();
    }
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    alert('You have to install MetaMask !');
  }
}