import { connect } from 'react-redux';
import App from '../App';
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
} from "../redux/reducers/lottery";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        lastWinner: getLastWinnerSelector(state),
        balancePrice: getBalancePriceSelector(state),
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
        findLastWinners: () => {
            dispatch(findLastWinners());
        },
        getLastWinner: () => {
            dispatch(getLastWinner());
        },
        getBalancePrice: () => {
            dispatch(getBalancePrice());
        },
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);