import moment from "moment";
import { FORMAT_DATE_TIME, LOTTEY_STATE_OPEN } from "./config";
import { LotteryContract, web3, accounts } from "./lib/DappUtils";
import Chance from 'chance';
const chance = new Chance();
const ENTER_PRICE_LOTTERY_IN_ETHER = '0.01';

export const startLotteryApi = async () => {
    const startDate = new Date();
    const endDate = new Date();
    const numberOfDayToAdd = 1;
    endDate.setDate(endDate.getDate() + numberOfDayToAdd );
    await LotteryContract.methods.start_new_lottery(startDate.getTime(), endDate.getTime()).send({ from: accounts[0]});
};
  
export const enterIntoLotteryApi = async () => {
    try {
        const ENTER_PRICE = web3.utils.toWei(ENTER_PRICE_LOTTERY_IN_ETHER, "ether"); 
        await LotteryContract.methods.enter().send({ from: accounts[0], value: ENTER_PRICE });
    } catch (error) {
        console.log(error.message);
    }
};
  
export const pickWinnerApi = async () => { 
    try {
        const seed = chance.natural();
        await LotteryContract.methods.pickWinner(seed).send( chance.natural(), { from: accounts[0] });
    } catch (error) {
        console.log(error);
    } 
};
  
export const getLastWinnerApi = async () => {
    try {
        const result4 = await LotteryContract.methods.getLastWinner().call({ from: accounts[0] });
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
        return parseFloat(web3.utils.fromWei(result4, "ether"));
    } catch (error) {
        return 0;
    }
}; 

export const getLotteryInfoApi = async () => {
    try {
        const result4 = await LotteryContract.methods.getLotteryInfo().call({ from: accounts[0] });
        const lotteryState = parseInt(result4[0]);
        return {
            state: lotteryState,
            startDate: (lotteryState === LOTTEY_STATE_OPEN) ? moment(parseInt(result4[1])).format(FORMAT_DATE_TIME) : null,
            endDate: (lotteryState === LOTTEY_STATE_OPEN) ? moment(parseInt(result4[2])).format(FORMAT_DATE_TIME) : null,
            enterPrice: parseFloat(web3.utils.fromWei(result4[3], "ether")),
            balance: parseFloat(web3.utils.fromWei(result4[4], "ether")),
        };
    } catch (error) {
        return null;
    }
}; 

export const countCurrentAddressPositionsApi = async () => {
    try {
        const result = await LotteryContract.methods.countCurrentAddressLotteryPositions().call({ from: accounts[0] });
        return parseInt(result);
    } catch (error) {
        return 0;
    }
};

export const countAllCurrentPositionsApi = async () => {
    try {
        const result = await LotteryContract.methods.countAllCurrentLotteryPositions().call({ from: accounts[0] });
        return parseInt(result);
    } catch (error) {
        return 0;
    }
};

export const newPlayerTickectAddedEventApi = async (fnSubscriptionCallback) => {
    try {
        await LotteryContract.events.NewPlayerTickectAdded()
        .on('data', (event) =>{
            fnSubscriptionCallback(event);
        })
        .on('changed', function(event){
            // remove event from local database
        })
        .on('error', console.error);
    } catch (error) {
        console.error(error);
    }
};

export const getLastWinnersApi = async () => {
    const result4 = await LotteryContract.methods.getLast40Winners().call({ from: accounts[0] });
    let winners = [];
    result4[0].forEach((winner, index) => {
       const amount = parseFloat(web3.utils.fromWei(result4[0][index], "ether"));
       if(amount > parseFloat(0)){
            winners.push({
                address: result4[4][index],
                block: result4[3][index],
                startDate: moment(parseInt(result4[1][index])).format(FORMAT_DATE_TIME),
                endDate:moment(parseInt(result4[2][index])).format(FORMAT_DATE_TIME),
                amount: amount
            }); 
       }
    });
    return winners;
};
