import { LotteryContract, web3, accounts } from "./lib/DappUtils";
import Chance from 'chance';
const chance = new Chance();
const ENTER_PRICE_LOTTERY_IN_ETHER = '0.01';

export const startLotteryApi = async () => {
    const startDate = new Date();
    const endDate = new Date();
    const numberOfDayToAdd = 1;
    endDate.setDate(endDate.getDate() + numberOfDayToAdd );
    const result1 = await LotteryContract.methods.start_new_lottery(startDate.getTime(), endDate.getTime()).send({ from: accounts[0]});
    console.log('Start new lottery');
    console.log(result1);
};
  
export const enterIntoLotteryApi = async () => {
    try {
        const ENTER_PRICE = web3.utils.toWei(ENTER_PRICE_LOTTERY_IN_ETHER, "ether"); 
        const result2 = await LotteryContract.methods.enter().send({ from: accounts[0], value: ENTER_PRICE });
        console.log('Enter into lottery');
        console.log(result2);
    } catch (error) {
        console.log(error.message);
    }
    
};
  
export const pickWinnerApi = async () => { 
    try {
        const seed = chance.natural();
        const result3 = await LotteryContract.methods.pickWinner(seed).send( chance.natural(), { from: accounts[0] });
        console.log('Pick winner');
        console.log(result3);
    } catch (error) {
        console.log(error);
    } 
};
  
export const getLastWinnerApi = async () => {
    try {
        const result4 = await LotteryContract.methods.getLastWinner().call({ from: accounts[0] });
        console.log('Get last winner');
        console.log(result4);
        return {
            block: result4[1],
            address: result4[2],
            amount: web3.utils.fromWei(result4[3], "ether")
        }; 
    } catch (error) {
        return null; 
    }  
};

export const getBalancePriceApi = async () => {
    try {
        const result4 = await LotteryContract.methods.getMainBalance().call({ from: accounts[0] });
        console.log('Get balance price');
        console.log(web3.utils.fromWei(result4, "ether"));
        return web3.utils.fromWei(result4, "ether");
    } catch (error) {
        return 0;
    }
};   


export const getLastWinnersApi = async () => {
    const result4 = await LotteryContract.methods.getLast40Winners().call({ from: accounts[0] });
    console.log('Get last 40 winners');
    console.log(result4);
    return {
        block: result4[1],
        address: result4[2],
        amount: web3.utils.fromWei(result4[3], "ether")
    };
};
