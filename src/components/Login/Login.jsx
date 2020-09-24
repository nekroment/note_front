import classes from "./Login.module.css";
import React from 'react';
import { reduxForm, Field } from "redux-form";
import { NavLink, Redirect } from "react-router-dom";
import { requierdField, maxLength, minLength, emailValid } from "../../utils/validators/validator";
import { Input } from "../../utils/FormControls";
import { connect } from "react-redux";
import { loginMeThunkCreator } from "../../redux/reducer/AuthReducer";

//Данные для валидации формы
const maxLengthPasswordField = maxLength(30);
const minLengthPasswordField = minLength(6);

//Форма для авторизации пользователя в redux-form
const LoginForm = (props) => {

    return (
        <div className={classes.form}>
            <form className={classes.loginForm} onSubmit={props.handleSubmit}>
                <Field component={Input} type={"text"} name={"email"} placeholder={"email"} validate={[requierdField, emailValid]} />
                <Field component={Input} type={"password"} name={"password"} placeholder={"password"} validate={[requierdField, maxLengthPasswordField, minLengthPasswordField]} />
                {props.error && <div className={classes.formSummaryError}>{props.error}</div>}
                <button>login</button>
                <p className={classes.message}>Not registered? <NavLink to="/registration">Create an account</NavLink></p>
            </form>
        </div>
    );
};

//Создание поля в редьюсере в редаксе
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

class Login extends React.Component {

    onSubmit = (formData) => {
        this.props.loginMeThunkCreator(formData.email, formData.password);
    }

    render() {
        if (this.props.isAuth === true) {
            return <Redirect to={'/notes'} />
        }
        else {
            return (
                <div className={classes.loginPage}>
                    <LoginReduxForm onSubmit={this.onSubmit} />
                </div>
            )
        }

    }
}

//Подключение компонента к редаксу
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginMeThunkCreator })(Login);