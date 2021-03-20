import { connect } from 'react-redux';
import App from '../App';
import { 
    isLogin,
} from "../redux/reducers/user";

const mapStateToProps = state => {
    return {
        isLogin: isLogin(state),
    }
};

export default connect(
    mapStateToProps,
    null
)(App);