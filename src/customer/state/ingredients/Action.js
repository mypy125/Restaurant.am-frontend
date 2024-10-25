import { api, API_URL } from "../../config/api";
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, 
    GET_INGREDIENTS, UPDATE_STOCK } from "./ActionTypes";

export const getIngredientOfRestaurant = ({ id, jwt }) => async (dispatch) => {

    try {
        const response = await api.get(`${API_URL}/api/admin/ingredients/restaurant/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get ingredint of restaurant", response.data);
        dispatch({ type: GET_INGREDIENTS, payload:response.data });
    } catch (error) {
       console.log("error", error);
    }
};

export const createIngredient = ({ data, jwt }) => async (dispatch) => {
   
    try {
        const response = await api.post(`${API_URL}/api/admin/ingredients`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("create ingredint", response.data);
        dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error", error);
    }
};

export const createIngredientCategory = ({ data, jwt }) => async (dispatch) => {
    console.log("data", data, "jwt",jwt);
    try {
        const response = await api.post(`${API_URL}/api/admin/ingredients/category`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("create ingredint category", response.data);
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error", error);
    }
};

export const getIngredientCategory = ({ id, jwt }) => async (dispatch) => {

    try {
        const response = await api.get(`${API_URL}/api/admin/ingredients/restaurant/${id}/category`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("get ingredint category", response.data);
        dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
    }
};

export const updateStockOfIngredient = ({ id, jwt }) => async (dispatch) => {

    try {
        const { data } = await api.put(`${API_URL}/api/admin/ingredients/${id}/stock`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("update ingredint stock", data);
        dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
        console.log("error", error);
    }
};
