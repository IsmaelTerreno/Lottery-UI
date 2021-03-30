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
    countAllPositions,
} from "../redux/actions/lottery";
import { 
    getWinnersListSelector,
    getLastWinnerSelector,
    getBalancePriceSelector,
    getLotteryInfoSelector,
    getCountCurrentPositionsSelector,
    getCountAllPositionSelector,
} from "../redux/reducers/lottery";
import { loadDapp } from "../lib/DappUtils";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        lastWinner: getLastWinnerSelector(state),
        balancePrice: getBalancePriceSelector(state),
        lotteryInfo: getLotteryInfoSelector(state),
        countCurrentPositions: getCountCurrentPositionsSelector(state),
        countAllPositions: getCountAllPositionSelector(state),
    }
};
  
const mapDispatchToProps = dispatch => {
    const loadDasboardData = () => {
        dispatch(getBalancePrice());
        dispatch(getLastWinner());
        dispatch(findLastWinners());
        dispatch(countCurrentPositions());
        dispatch(countAllPositions());
    };
    return {
        startLottery: () => {
            dispatch(startNewLottery());
        },
        pickWinner: () => {
            dispatch(pickWinner());
        },
        enterIntoLottery: () => {
            dispatch(enterIntoLottery());
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