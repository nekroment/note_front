import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import authReducer from "./reducer/AuthReducer";
import userReducer from "./reducer/UserReducer";

let reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

