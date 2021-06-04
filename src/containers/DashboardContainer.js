import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import {
    findLastWinners,
    startNewLottery,
    enterIntoLottery,
    pickWinner,
    getLastWinner,
    getBalancePrice,
    countCurrentPositions,
    countAllPositions, isLotteryAdmin,
} from "../redux/actions/lottery";
import {
    getWinnersListSelector,
    getLastWinnerSelector,
    getBalancePriceSelector,
    getLotteryInfoSelector,
    getCountCurrentPositionsSelector,
    getCountAllPositionSelector, getIsLotteryAdminSelector,
} from "../redux/reducers/lottery";
import { loadDapp } from "../lib/DappUtils";
import { newPlayerTicketAddedEventApi } from "../api";
import {LOTTERY_STATE_CLOSED, LOTTERY_STATE_OPEN} from "../config";


const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        lastWinner: getLastWinnerSelector(state),
        balancePrice: getBalancePriceSelector(state),
        lotteryInfo: getLotteryInfoSelector(state),
        countCurrentPositions: getCountCurrentPositionsSelector(state),
        countAllPositions: getCountAllPositionSelector(state),
        isAdminRole: getIsLotteryAdminSelector(state),
    }
};
  
const mapDispatchToProps = dispatch => {
    const loadDasboardData = () => {
        dispatch(getBalancePrice());
        dispatch(getLastWinner());
        dispatch(findLastWinners());
        dispatch(countCurrentPositions());
        dispatch(countAllPositions());
        dispatch(isLotteryAdmin());
    };
    newPlayerTicketAddedEventApi((event)=>{
        loadDasboardData();
    });
    return {
        startLottery: () => {
            dispatch(startNewLottery());
        },
        pickWinner: () => {
            dispatch(pickWinner());
        },
        enterIntoLottery: (lotteryState) => {
            if(lotteryState === LOTTERY_STATE_OPEN){
                dispatch(enterIntoLottery());
            }
            if(lotteryState === LOTTERY_STATE_CLOSED){
                console.log("A new Lottery is not ready yet.");
            }
        },
        loadDappMainData: () => {
            loadDapp(loadDasboardData);
        },
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);