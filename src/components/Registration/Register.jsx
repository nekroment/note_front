import classes from "./Register.module.css";
import React from 'react';
import { reduxForm, Field } from "redux-form";
import { NavLink, Redirect } from "react-router-dom";
import { Input } from "../../utils/FormControls";
import { maxLength, minLength, requierdField, emailValid } from "../../utils/validators/validator";
import { connect } from "react-redux";
import { registrationThunkCreator } from "../../redux/reducer/AuthReducer";

//Переменные для валидации формы регистрации
const maxLengthNameField = maxLength(15);
const minLengthNameField = minLength(5);
const maxLengthPasswordField = maxLength(30);
const minLengthPasswordField = minLength(6);

//Форма регистрации form-redux
const RegisterForm = (props) => {
    return (
        <div className={classes.form}>
            <form className={classes.registerForm} onSubmit={props.handleSubmit}>
                <Field component={Input} name={"name"} type={"text"} placeholder={"name"} validate={[requierdField, maxLengthNameField, minLengthNameField]} />
                <Field component={Input} name={"email"} type={"text"} placeholder={"email address"} validate={[requierdField, emailValid]} />
                <Field component={Input} name={"password"} type={"password"} placeholder={"password"} validate={[requierdField, maxLengthPasswordField, minLengthPasswordField]} />
                <button>create</button>
                <p className={classes.message}>Already registered? <NavLink to="/login">Sign In</NavLink></p>
            </form>
        </div>
    );
};

//Создание reducer в redux
const RegisterReduxForm = reduxForm({
    form: 'register'
})(RegisterForm);

const Register = (props) => {

    const onSubmit = (formData) => {
        props.registrationThunkCreator(formData.email, formData.password, formData.name);
    }

    if (props.isAuth === true) {
        return <Redirect to={'/notes'} />
    }
    return (
        <div className={classes.loginPage}>
            <RegisterReduxForm onSubmit={onSubmit} />
        </div>
    );
};

//Подключение компонента регистрации к редаксу
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { registrationThunkCreator })(Register);