import './App.css';
import Web3 from 'web3';
import contract_abi from './build/contracts/Lottery.json';
const contractAddress = '0x0e7799CEAE9C1640EB5943C10A96fBc69910D922';
const ENTER_PRICE_LOTTERY_IN_ETHER = '0.2';
let LotteryContract;
let web3;
let accounts;

// Modern DApp Browsers
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try { 
     window.ethereum.enable().then(async() =>{
        accounts = await web3.eth.getAccounts();
        // User has allowed account access to DApp...
        LotteryContract = new web3.eth.Contract(contract_abi.abi, contractAddress);
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
};
const getBalancePrice = async () => {
  const result4 = await LotteryContract.methods.getMainBalance().call({ from: accounts[0] });
  console.log('Get balance price');
  console.log(web3.utils.fromWei(result4, "ether"));
};
const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Lottery app base 2.
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
