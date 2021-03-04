import { connect } from 'react-redux';
import App from '../App';
import { 
    findLastWinners,
    startNewLottery,
    enterIntoLottery,
    pickWinner,
} from "../redux/actions/lottery";
import { 
    getWinnersListSelector,
    getLastWinnerSelector,
} from "../redux/reducers/lottery";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        lastWinner: getLastWinnerSelector(state),
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
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);