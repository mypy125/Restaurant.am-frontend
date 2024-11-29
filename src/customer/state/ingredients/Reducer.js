import { CREATE_INGREDIENT_CATEGORY_SUCCESS, 
    CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, 
    GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, UPDATE_STOCK 
} from "./ActionTypes";
  
  const initialState = {
    ingredients: [],
    update: null,
    category: [],
    loading: false,
    error: null
  };
  
  export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null, 
        };
  
      case GET_INGREDIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          ingredients: Array.isArray(action.payload)
            ? action.payload.map((ingredient) => ({
                ...ingredient,
                category: ingredient.category || { name: 'No Category' }, 
              }))
            : [],
        };
  
      case GET_INGREDIENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error, 
        };
  
      case GET_INGREDIENT_CATEGORY_SUCCESS:
        return {
          ...state,
          category: Array.isArray(action.payload) ? action.payload : [], 
        };
  
      case CREATE_INGREDIENT_CATEGORY_SUCCESS:
        return {
          ...state,
          category: [...state.category, action.payload], 
        };
  
      case CREATE_INGREDIENT_SUCCESS:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload], 
        };
  
      case UPDATE_STOCK:
        return {
          ...state,
          update: action.payload, 
          ingredients: state.ingredients.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item 
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default ingredientReducer;
  