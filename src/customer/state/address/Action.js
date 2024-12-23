import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS,
     DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, 
     FETCH_ADDRESSES_FAILURE, FETCH_ADDRESSES_REQUEST, FETCH_ADDRESSES_SUCCESS, 
    UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS
 } from "./ActionType";
 
 import { api } from "../../config/api";


 export const addAddress = ({ addressData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });

    try {
        const { data } = await api.post("/api/address", addressData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: handleError(error) });
    }
};

export const fetchAddresses = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });

    try {
        const { data } = await api.get("/api/address", {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: handleError(error) });
    }
};

export const updateAddress = ({ addressId, addressData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });

    try {
        const { data } = await api.put(`/api/address/${addressId}`, addressData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: handleError(error) });
    }
};

export const deleteAddress = ({ addressId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });

    try {
        await api.delete(`/api/address/${addressId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
    } catch (error) {
        dispatch({ type: DELETE_ADDRESS_FAILURE, payload: handleError(error) });
    }
};