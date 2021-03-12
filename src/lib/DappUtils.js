import { CONTRACT_ADDRESS } from '../config';
import Web3 from 'web3';
import contract_abi from '../build/contracts/Lottery.json';

export let LotteryContract;
export let web3;
export let accounts;

export const loadDapp = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.on('accountsChanged', (chainId) => {
      window.location.reload();
    });
  } else {
    alert('You have to install MetaMask !');
  }
}

export const loginDapp = async () => {
  try { 
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    accounts = await web3.eth.getAccounts();
    // User has allowed account access to DApp...
    LotteryContract = new web3.eth.Contract(contract_abi.abi, CONTRACT_ADDRESS);    
  } catch(e) {
    // User has denied account access to DApp...
    // window.location.reload();
  }
};