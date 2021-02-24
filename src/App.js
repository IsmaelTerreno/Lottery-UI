import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import contract_abi from './build/contracts/Lottery.json';
const contractAddress = '0x5612b6D5A9EF2C2B56f00e2349601A8811B0D652';
const ENTER_PRICE_LOTTERY_IN_ETHER = '0.2';
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
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    } catch(e) {
      // User has denied account access to DApp...
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

const startLottery = async () => {
  const result1 = await LotteryContract.methods.start_new_lottery().send({ from: accounts[0]});
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
  const result3 = await LotteryContract.methods.pickWinner().send({ from: accounts[0] });
  console.log('Pick winner');
  console.log(result3);
};

const getLastWinner = async () => {
  const result4 = await LotteryContract.methods.getLastWinner().call({ from: accounts[0] });
  console.log('Get last winner');
  console.log(result4);
  return {
    block: result4[0],
    address: result4[1],
    amount: web3.utils.fromWei(result4[2], "ether")
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
