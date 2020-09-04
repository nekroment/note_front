import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducer/AuthReducer";

let reducers = combineReducers({
    auth: authReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;