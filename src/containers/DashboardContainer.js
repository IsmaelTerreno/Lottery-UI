import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import { 
    findLastWinners,
    startNewLottery,
    enterIntoLottery,
    pickWinner,
    getLastWinner,
    getBalancePrice,
} from "../redux/actions/lottery";
import { 
    getWinnersListSelector,
    getLastWinnerSelector,
    getBalancePriceSelector,
    getLotteryInfoSelector,
} from "../redux/reducers/lottery";
import { loadDapp } from "../lib/DappUtils";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        lastWinner: getLastWinnerSelector(state),
        balancePrice: getBalancePriceSelector(state),
        lotteryInfo: getLotteryInfoSelector(state),
    }
};
  
const mapDispatchToProps = dispatch => {
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
            loadDapp(()=>{
                dispatch(getBalancePrice());
                dispatch(getLastWinner());
                dispatch(findLastWinners());
            });
        },
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);