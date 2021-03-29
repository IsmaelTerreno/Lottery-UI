import { connect } from 'react-redux';
import HomePublic from '../HomePublic';
import { 
    getBalancePrice,
    findLastWinners,
    getLotteryInfo,
} from "../redux/actions/lottery";
import { 
    setIslogin,
} from "../redux/actions/user";
import { 
    getWinnersListSelector,
    getBalancePriceSelector,
    getLotteryInfoSelector,
} from "../redux/reducers/lottery";
import { loadDappPublic, loadDapp } from "../lib/DappUtils";

const mapStateToProps = state => {
    return {
        winners: getWinnersListSelector(state),
        balancePrice: getBalancePriceSelector(state),
        lotteryInfo: getLotteryInfoSelector(state),
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        loginToApp: () => {
            const loadDashboardData = ()=>{
                dispatch(setIslogin(true));
                dispatch(getBalancePrice());
                dispatch(findLastWinners());
            };
            loadDapp(loadDashboardData, loadDashboardData);
        },
        loadDappMainData: () => {
            loadDappPublic(() => {
                dispatch(getBalancePrice());
                dispatch(getLotteryInfo());
            });
        },
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePublic);