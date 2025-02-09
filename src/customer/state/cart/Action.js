
import { api } from "../../config/api";
import { 
    ADD_ITEMS_TO_CART_FAILURE, 
    ADD_ITEMS_TO_CART_REQUEST, 
    ADD_ITEMS_TO_CART_SUCCESS, 
    CLEARE_CART_FAILURE, 
    CLEARE_CART_REQUEST,
    CLEARE_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST, 
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CARTITEM_FAILURE, 
    REMOVE_CARTITEM_REQUEST, 
    REMOVE_CARTITEM_SUCCESS, 
    UPDATE_CARTITEM_FAILURE, 
    UPDATE_CARTITEM_REQUEST, 
    UPDATE_CARTITEM_SUCCESS,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS, 
    ADD_ADDRESS_FAILURE
    
} from "./ActionType";

const handleError = (error) => error.response?.data?.message || error.message;

export const addAddress = ({addressData, jwt}) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    try {
        const { data } = await api.post("/api/address", addressData, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAILURE, payload: handleError(error) });
    }
};

export const findCart = (jwt) => async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });

    try {
        const response = await api.get("/api/cart", {
            headers: { 
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("my cart ", response.data)
        dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error ", error)
        dispatch({ type: FIND_CART_FAILURE, payload: handleError(error) });
    }
};

export const getAllCartItems = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

    try {
        const response = await api.get(`/api/cart/${reqData.cartId}/items`, {
            headers: { Authorization: `Bearer ${reqData.token}` }
        });
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: handleError(error) });
    }
};

export const addItemsToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEMS_TO_CART_REQUEST });

    try {
        const { data } = await api.put("/api/cart/add", reqData.cartItem, {
            headers: { Authorization: `Bearer ${reqData.token}` }
        });
        dispatch({ type: ADD_ITEMS_TO_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_ITEMS_TO_CART_FAILURE, payload: handleError(error) });
    }
};

export const updateCartItem = ({reqData,token}) => async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });

    try {
        const { data } = await api.put("/api/cart-item/update", reqData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: handleError(error) });
    }
};

export const removeCartItem = ({ cartItemId, jwt }) => async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });

    try {
        await api.delete(`/api/cart-item/${cartItemId}/remove`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (error) {
        dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: handleError(error) });
    }
};

export const clearCartAction = (token) => async (dispatch) => {
    dispatch({ type: CLEARE_CART_REQUEST });

    try {
        const { data } = await api.put("/api/cart/clear", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CLEARE_CART_FAILURE, payload: handleError(error) });
    }
};