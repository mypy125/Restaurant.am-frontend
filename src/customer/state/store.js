import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./restaurant/Reducer";
import menuItemsReducer from "./menu/Reducer";
import cartReducer from "./cart/Reducer";
import orderReducer from "./order/Reducer";
import ingredientReducer from "./ingredients/Reducer";
import restaurantsOrderReducer from "./restaurantOrder/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemsReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
