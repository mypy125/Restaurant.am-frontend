import { api } from "../../config/api";
import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABLITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABLITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABLITY_SUCCESS,
} from "./ActionType";


const handleError = (error) => error.response?.data?.message || error.message;


export const createMenuItem = ({ menu, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });

    try {
        const { data } = await api.post("/api/admin/food", menu, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: handleError(error) });
    }
};

export const getMenuItemsByRestaurantId = (reqData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST });

    console.log("Request Data:", reqData);

    if (!reqData || !reqData.restaurantId) {
        console.error("Restaurant ID is undefined");
        dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload: "Restaurant ID is required." });
        return;
    }

    try {
        const { data } = await api.get(
            `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
            { headers: { Authorization: `Bearer ${reqData.jwt}` } }
        );

        console.log("API Response Data:", data); 

        if (data && data.menuItems) {
            dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload: data.menuItems });
        } else {
            dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload: "No menu items found." });
        }
    } catch (error) {
        const errorMessage = handleError(error);
        console.error("Error in API call:", errorMessage);
        dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload: errorMessage });
    }
};


export const searchMenuItem = ({ keyword, jwt }) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

    try {
        const { data } = await api.get(`/api/food/search?name=${keyword}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: handleError(error) });
    }
};

export const updateMenuItemsAvailability = ({ foodId, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABLITY_REQUEST });

    try {
        const { data } = await api.put(`/api/admin/food/${foodId}`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABLITY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABLITY_FAILURE, payload: handleError(error) });
    }
};

export const deleteFoodAction = ({ foodId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });

    try {
        await api.delete(`/api/admin/food/${foodId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (error) {
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: handleError(error) });
    }
};
