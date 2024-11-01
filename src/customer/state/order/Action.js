import { api } from "../../config/api";
import { 
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
    GET_USER_NOTIFICATION_FAILURE, GET_USER_NOTIFICATION_REQUEST, 
    GET_USER_NOTIFICATION_SUCCESS, GET_USER_ORDERS_FAILURE, 
    GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS 
} from "./ActionType";


const handleError = (error) => error.response?.data?.message || error.message;


export const createOrder = ({ order, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        const { data } = await api.post("/api/order/", order, {
            headers: { Authorization: `Bearer ${jwt}` },
        });

        if (data.payment_url) {
            window.location.href = data.payment_url;
        }

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: handleError(error) });
    }
};

export const getUsersOrders = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_ORDERS_REQUEST });

    try {
        const { data } = await api.get("/api/order/user", {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_ORDERS_FAILURE, payload: handleError(error) });
    }
};

export const getUserNotificationAction = () => async (dispatch) => {
    dispatch({ type: GET_USER_NOTIFICATION_REQUEST });

    try {
        const { data } = await api.get("/api/notifications");
        dispatch({ type: GET_USER_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_NOTIFICATION_FAILURE, payload: handleError(error) });
    }
};
