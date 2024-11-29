import { api } from "../../config/api";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_LOADING, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_LOADING, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_LOADING, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, 
     GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_LOADING, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, UPDATE_STOCK } from "./ActionTypes";

export const getIngredientOfRestaurant = ({ id, jwt }) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST, loading: true });
  
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
     
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: response.data });
  
      dispatch({ type: GET_INGREDIENTS_LOADING, loading: false });
  
    } catch (error) {
      dispatch({
        type: GET_INGREDIENTS_FAILURE,
        error: error.response?.data?.message || error.message,
      });
      dispatch({ type: GET_INGREDIENTS_LOADING, loading: false });
    }
};
      
export const createIngredient = ({ data, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
  
    try {
      const response = await api.post("/api/admin/ingredients", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
  
      dispatch({ type: CREATE_INGREDIENT_LOADING, loading: false });
  
    } catch (error) {
      console.error("Error creating ingredient", error);
  
      dispatch({
        type: CREATE_INGREDIENT_FAILURE,
        error: error.response?.data?.message || error.message,
      });
  
      dispatch({ type: CREATE_INGREDIENT_LOADING, loading: false });
    }
  };
  

  export const createIngredientCategory = ({ data, jwt }) => async (dispatch) => {
    if (!data || !jwt) {
      const errorMessage = "Data or JWT is missing";
      console.error(errorMessage);
      return dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
        error: errorMessage,
      });
    }
  
 
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
  
    try {
      const response = await api.post("/api/admin/ingredients/category", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
  
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_LOADING, loading: false });
  
    } catch (error) {
      console.error("Error creating ingredient category", error);
  
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
        error: error.response?.data?.message || error.message,
      });
  
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_LOADING, loading: false });
    }
  };
  

  export const getIngredientCategory = ({ id, jwt }) => async (dispatch) => {
    if (!id || !jwt) {
      const errorMessage = "ID or JWT is missing";
      console.error(errorMessage);
      return dispatch({
        type: GET_INGREDIENT_CATEGORY_FAILURE,
        error: errorMessage,
      });
    }
  
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
  
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
  
      dispatch({ type: GET_INGREDIENT_CATEGORY_LOADING, loading: false });
  
    } catch (error) {
      console.error("Error fetching ingredient categories", error);
  
      dispatch({
        type: GET_INGREDIENT_CATEGORY_FAILURE,
        error: error.response?.data?.message || error.message,
      });
  
      dispatch({ type: GET_INGREDIENT_CATEGORY_LOADING, loading: false });
    }
  };
  

export const updateStockOfIngredient = ({ id, jwt }) => async (dispatch) => {

    try {
        const { data } = await api.put(`/api/admin/ingredients/${id}/stoke`, {}, {
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
