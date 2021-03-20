import { connect } from 'react-redux';
import HomePublic from '../HomePublic';
import { 
    getBalancePrice,
    findLastWinners,
} from "../redux/actions/lottery";
import { 
    setIslogin,
} from "../redux/actions/user";
import { 
    getWinnersListSelector,
    getBalancePriceSelector,
} from "../redux/reducers/lottery";
import { loadDappPublic, loadDapp } from "../lib/DappUtils";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        balancePrice: getBalancePriceSelector(state),
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        loginToApp: () => {
            loadDapp(()=>{
                dispatch(setIslogin(true));
                dispatch(getBalancePrice());
                dispatch(findLastWinners());
            });
        },
        loadDappMainData: () => {
            loadDappPublic(() => {
                dispatch(getBalancePrice());
            });
        },
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePublic);