import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import contract_abi from './build/contracts/Lottery.json';
import Chance from 'chance';
const contractAddress = '0x1D8a2F84C7dAa3067aA885807a26Ad6DEAB85745';
const ENTER_PRICE_LOTTERY_IN_ETHER = '0.2';
const chance = new Chance();
let LotteryContract;
let web3;
let accounts;

const loadDapp = async () => {
  // Modern DApp Browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try { 
      window.ethereum.enable().then(async() =>{
          accounts = await web3.eth.getAccounts();
          // User has allowed account access to DApp...
          LotteryContract = new web3.eth.Contract(contract_abi.abi, contractAddress);
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

loadDapp();

const startDate = new Date();
const endDate = new Date();
const numberOfDayToAdd = 1;
endDate.setDate(endDate.getDate() + numberOfDayToAdd );

const startLottery = async () => {
  const result1 = await LotteryContract.methods.start_new_lottery(startDate.getTime(), endDate.getTime()).send({ from: accounts[0]});
  console.log('Start new lottery');
  console.log(result1);
};

const enterIntoLottery = async () => {
  const ENTER_PRICE = web3.utils.toWei(ENTER_PRICE_LOTTERY_IN_ETHER, "ether"); 
  const result2 = await LotteryContract.methods.enter().send({ from: accounts[0], value: ENTER_PRICE });
  console.log('Enter into lottery');
  console.log(result2);
};

const pickWinner = async () => {
  const seed = chance.natural();
  const result3 = await LotteryContract.methods.pickWinner(seed).send( chance.natural(), { from: accounts[0] });
  console.log('Pick winner');
  console.log(result3);
};

const getLastWinner = async () => {
  const result4 = await LotteryContract.methods.getLastWinner().call({ from: accounts[0] });
  console.log('Get last winner');
  console.log(result4);
  return {
    block: result4[1],
    address: result4[2],
    amount: web3.utils.fromWei(result4[3], "ether")
  };
};
const getBalancePrice = async () => {
  const result4 = await LotteryContract.methods.getMainBalance().call({ from: accounts[0] });
  console.log('Get balance price');
  console.log(web3.utils.fromWei(result4, "ether"));
  return web3.utils.fromWei(result4, "ether");
};



const App = () => {
  const [lotteryInfo, setLotteryInfo] = useState({
    balance:0,
    winnerInfo:{
      block: null,
      address: '',
      amount: 0,
      players:null,
    },
  });
  useEffect(() => {
      setTimeout(() => {
        const fetchData = async () => {
          let currentBalance = await getBalancePrice();
          let winnerInfo = await getLastWinner();

          setLotteryInfo({
            ...lotteryInfo,
            balance: currentBalance,
            winnerInfo,
          }); 
        }
        fetchData();
     }, 1000);
  }, []);
  const { balance, winnerInfo} = lotteryInfo;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Lottery balance {balance} ETH.
        </p>
        <p>
          Last winner infomation
        </p>
        <p>
          Address {winnerInfo.address}
        </p>
        <p>
          Block: {winnerInfo.block}
        </p>
        <p>
          Amount: {winnerInfo.amount} ETH
        </p>
        <button onClick={startLottery}>Start lottery</button>
        <button onClick={enterIntoLottery}>Participate</button>
        <button onClick={pickWinner}>Pick winner</button>
        <button onClick={getLastWinner}>Get last Winner</button>
        <button onClick={getBalancePrice}>Get balance price</button> 
      </header>
    </div>
  );
}

export default App;
