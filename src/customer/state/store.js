import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./restaurant/Reducer";

const rooteReducer=combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer

});

export const store=legacy_createStore(rooteReducer,applyMiddleware(thunk));