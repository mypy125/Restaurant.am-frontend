import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, 
    ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST,
    GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../config/api"

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await api.post(`${API_URL}/auth/signup`, reqData.userData);

        if (data.jwt) localStorage.setItem("jwt", data.jwt);

        if (data.role === "OWNER" || data.role === "ADMIN") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("register success", data);
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data || error.message,
        });
        console.log("register error", error);
    }
};

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await api.post(`${API_URL}/auth/signin`, reqData.userData);
        
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }

        if (data.role === "OWNER" || data.role === "ADMIN") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("login success", data);
    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        console.error("Login error", errorMessage);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    const jwt = localStorage.getItem("jwt"); 
    if (!jwt) {
        dispatch({ type: GET_USER_FAILURE, payload: "No token found" });
        return;
    }

    try {
        const { data } = await api.get(`${API_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("user profile", data);
    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        console.log("get user error", errorMessage);

        if (error.response?.status === 401) {
            dispatch({ type: LOGOUT });
        }
    }
};

export const addToFavorite = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });

    const jwt = localStorage.getItem("jwt"); 
    if (!jwt) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: "No token found" });
        return;
    }

    try {
        const { data } = await api.put(`${API_URL}/api/restaurants/${restaurantId}/add-favorites`, {});

        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
        console.log("added to favorites", data);
        
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error.response?.data || error.message });
        console.log("add to favorite error", error);
    }
};


export const logout=()=>async(dispatch)=> {

    try {

        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("logout success")  
        
    } catch (error) {
        console.log("error", error)
    }
}