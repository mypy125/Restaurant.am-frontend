import { api } from "../../config/api";
import {
  CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAILURE, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS,
  CREATE_RESTAURANT_REQUEST, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAIRANTS_CATEGORY_FAILURE, GET_RESTAIRANTS_CATEGORY_REQUEST, 
  GET_RESTAIRANTS_EVENTS_FAILURE, GET_RESTAIRANTS_EVENTS_REQUEST, GET_RESTAIRANTS_EVENTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS,
  GET_RESTAIRANTS_CATEGORY_SUCCESS,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE
} from "./ActionType";

const handleError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    return error.response.data?.message || 'An error occurred while processing the request.';
  } else if (error.request) {
    return 'No response received from the server.';
  } else {
    return error.message || 'Unknown error occurred.';
  }
};


export const getAllResaurantsAction = (token) => async (dispatch) => {
  if (!token) {
    return dispatch({
      type: GET_ALL_RESTAURANT_FAILURE,
      payload: "Authorization token is missing.",
    });
  }

  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

  try {
    const { data } = await api.get("/api/restaurants", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: handleError(error) });
  }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

  console.log(`Requesting data for restaurant with ID: ${reqData.restaurantId}`);

  if (!reqData || !reqData.restaurantId || !reqData.jwt) {
    console.error("Restaurant ID or JWT is missing");
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAILURE,
      payload: "Restaurant ID or JWT is required."
    });
    return;
  }

  const restaurantId = Number(reqData.restaurantId);
  if (isNaN(restaurantId)) {
    console.error("Invalid Restaurant ID");
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAILURE,
      payload: "Invalid Restaurant ID"
    });
    return;
  }

  try {
    const { data } = await api.get(`/api/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${reqData.jwt}` },
    });

    console.log('Fetched data:', data);

    if (data) {
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    } else {
      dispatch({
        type: GET_RESTAURANT_BY_ID_FAILURE,
        payload: "No data found for this restaurant."
      });
    }
  } catch (error) {
    console.error('Error fetching restaurant:', error);

    const errorMessage = handleError(error);
    dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: errorMessage });
  }
};


export const getResaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get("/api/admin/restaurants/user", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: handleError(error) });
  }
};

export const createRestaurant = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });

  try {
    const { data } = await api.post("/api/admin/restaurants", reqData.data, {
      headers: { Authorization: `Bearer ${reqData.token}` },
    });

    if (data && data.restaurant) {
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data.restaurant });
    } else {
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: 'Unexpected response format' });
    }

  } catch (error) {
    console.error("Error creating restaurant:", error.response?.data || error.message);
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: handleError(error) });
  }
};

export const updateResaurant = (restaurantId, restaurantData, jwt) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.put(`/api/admin/restaurant/${restaurantId}`, restaurantData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: handleError(error) });
  }
};

export const deleteResaurant = (restaurantId, jwt) => async (dispatch) => {
  dispatch({ type: DELETE_RESTAURANT_REQUEST });
  try {
    await api.delete(`/api/admin/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
  } catch (error) {
    dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: handleError(error) });
  }
};

export const updateResaurantStatus = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const res = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {},{
      headers: {
         Authorization: `Bearer ${jwt}`
         },
    });

    console.log("res--",res.data)
    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: handleError(error) });
  }
};

export const createEventAction = ({data, jwt, restaurantId}) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const { data: eventData } = await api.post(`/api/admin/events/restaurant/${restaurantId}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: eventData });
  } catch (error) {
    dispatch({ type: CREATE_EVENT_FAILURE, payload: handleError(error) });
  }
};

export const getAllEvents = ({jwt}) => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_REQUEST });
  try {
    const { data } = await api.get("/api/events", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: handleError(error) });
  }
};

export const deleteEventAction = ({eventId, jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_EVENTS_REQUEST });
  try {
    await api.delete(`/api/admin/events/${eventId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
  } catch (error) {
    dispatch({ type: DELETE_EVENTS_FAILURE, payload: handleError(error) });
  }
};

export const getRestaurantEvents = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch({ type: GET_RESTAIRANTS_EVENTS_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_RESTAIRANTS_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESTAIRANTS_EVENTS_FAILURE, payload: handleError(error) });
  }
};

export const createCategoryAction = ({reqData, jwt}) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });

  try {
    const res = await api.post("/api/admin/category", reqData, {
      headers: { 
        Authorization: `Bearer ${jwt}`
       },
    });
    console.log("create category",res.data);

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("catch---",error);
    dispatch({ type: CREATE_CATEGORY_FAILURE, payload: handleError(error) });
  }
};

export const getRestaurantsCategory = ({jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: GET_RESTAIRANTS_CATEGORY_REQUEST });

  if (!restaurantId) {
    console.error("Restaurant ID is required");
    dispatch({ type: GET_RESTAIRANTS_CATEGORY_FAILURE, payload: "Restaurant ID is required." });
    return;
  }

  try {
    const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
      headers: { 
        Authorization: `Bearer ${jwt}`
       },
    });
    console.log("Categories Data from API:", res.data);

    if (res.data && res.data.length > 0) {
      dispatch({ type: GET_RESTAIRANTS_CATEGORY_SUCCESS, payload: res.data });
    } else {
      console.log("No categories found for restaurantId:", restaurantId);
      dispatch({ type: GET_RESTAIRANTS_CATEGORY_FAILURE, payload: "No categories found." });
    }
  } catch (error) {
    dispatch({ type: GET_RESTAIRANTS_CATEGORY_FAILURE, payload: handleError(error) });
  }
};


