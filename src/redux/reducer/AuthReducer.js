import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { setUserNote } from "./UserReducer";


const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';

//Начальное значение состояния пользователя
let initialState = {
    usersId: null,
    isAuth: false,
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        //Обозначение авторизации пользователя
        case SET_AUTH: {
            return { ...state, isAuth: action.isAuth };
        }
        //Завершение инициализации
        case SET_USER: {
            return { ...state, token: action.token };
        }
        default: return state;
    }
};

//dispatch авторизации
export const setAuth = (isAuth) => ({
    type: SET_AUTH,
    isAuth
})

//dispatch id пользователя
export const setUser = (token) => ({
    type: SET_USER,
    token
})

//Запрос на получения данных пользователя
export const authMeThunkCreator = (token) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.authMe(token);
            if (response.data.correct === true) {
                dispatch(setAuth(true));
                dispatch(setUserNote(response.data.userNotes));
            }
        } catch (error) {
        }
    };
};

//Запрос на авторизацию пользователя
export const loginMeThunkCreator = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.Login(email, password);
            if (response.data.correct === true) {
                dispatch(setUser(response.headers.auth_token));
                dispatch(authMeThunkCreator(response.headers.auth_token));
            }
        } catch (error) {
            let action = stopSubmit("login", { _error: error.response.data.message });
            dispatch(action);
        }
    }
}


//Запрос на выход пользователя
export const logOutThunkCreator = (token) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.LogOut(token);
            if (response.data.correct === true) {
                dispatch(setAuth(false));
                dispatch(setUserNote([]));
                dispatch(setUser(null));
            }
        } catch (error) {

        }
    };
};

//Запрос на регистрацию пользователя
export const registrationThunkCreator = (email, password, login) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.Registration(email, password, login);
            if (response.data.correct === true) {
                dispatch(loginMeThunkCreator(email, password));
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

export default authReducer;