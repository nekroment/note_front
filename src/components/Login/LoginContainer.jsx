import { connect } from "react-redux";
import { LoginMeThunkCreator } from "../../redux/reducer/AuthReducer";
import Login from "./Login";

const mapStateToProps = (state) => {
    return({
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    });
};

export default connect(mapStateToProps, {LoginMe: LoginMeThunkCreator})(Login);