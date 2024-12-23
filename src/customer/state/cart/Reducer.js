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

const initialState = {
    cart: null,
    cartItems: [],
    addresses: [],
    loading: false,
    error: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case ADD_ITEMS_TO_CART_REQUEST:
        case UPDATE_CARTITEM_REQUEST:
        case REMOVE_CARTITEM_REQUEST:
        case ADD_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                addresses: [...state.addresses, action.payload],
                loading: false
            };
        case ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEARE_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
                loading: false
            };
        case GET_ALL_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
                loading: false
            };
        case ADD_ITEMS_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                loading: false
            };
        case UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false
            };
        case REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
                loading: false
            };
        case CLEARE_CART_SUCCESS:
            return {
                ...state,
                cartItems: [],
                loading: false
            };
        case FIND_CART_FAILURE:
        case GET_ALL_CART_ITEMS_FAILURE:
        case ADD_ITEMS_TO_CART_FAILURE:
        case UPDATE_CARTITEM_FAILURE:
        case REMOVE_CARTITEM_FAILURE:
        case CLEARE_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default cartReducer;