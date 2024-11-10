import { 
    REMOVE_FROM_FAVORITE_REQUEST,REMOVE_FROM_FAVORITE_SUCCESS,REMOVE_FROM_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, 
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
    LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType";
import { api } from "../../config/api";

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleError = (error, failureType, dispatch) => {
    const errorMessage = error.response?.data || error.message;
    dispatch({ type: failureType, payload: errorMessage });
    console.error(errorMessage);
};

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await api.post("/auth/signup", reqData.userData);

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }

        reqData.navigate(data.role === "OWNER" || data.role === "ADMIN" ? "/admin/restaurants" : "/");
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register success", data);
    } catch (error) {
        handleError(error, REGISTER_FAILURE, dispatch);
    }
};

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await api.post("/auth/signin", reqData.userData);
        
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }

        reqData.navigate(data.role === "OWNER" || data.role === "ADMIN" ? "/admin/restaurants" : "/");
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login success", data);
    } catch (error) {
        handleError(error, LOGIN_FAILURE, dispatch);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    if (!localStorage.getItem("jwt")) {
        dispatch({ type: GET_USER_FAILURE, payload: "No token found" });
        return;
    }

    try {
        const { data } = await api.get("/api/users/profile");
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("User profile", data);
    } catch (error) {
        handleError(error, GET_USER_FAILURE, dispatch);
        
        if (error.response?.status === 401) {
            dispatch({ type: LOGOUT });
        }
    }
};

export const addToFavorite = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });

    if (!localStorage.getItem("jwt")) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: "No token found" });
        return;
    }

    try {
        const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`);
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
        console.log("Added to favorites", data);
    } catch (error) {
        handleError(error, ADD_TO_FAVORITE_FAILURE, dispatch);
    }
};

export const removeFromFavorite = (restaurantId) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_FAVORITE_REQUEST });

    if (!localStorage.getItem("jwt")) {
        dispatch({ type: REMOVE_FROM_FAVORITE_FAILURE, payload: "No token found" });
        return;
    }

    try {
        const { data } = await api.put(`/api/restaurants/${restaurantId}/remove-favorites`);
        dispatch({ type: REMOVE_FROM_FAVORITE_SUCCESS, payload: data });
        console.log("Removed from favorites", data);
    } catch (error) {
        handleError(error, REMOVE_FROM_FAVORITE_FAILURE, dispatch);
    }
};


export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout success");
    } catch (error) {
        console.error("Logout error", error);
    }
};
