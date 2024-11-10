import * as actionTypes from './ActionType';

const initialState = {
  addresses: [], 
  loading: false,
  error: null, 
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };

    case actionTypes.UPDATE_ADDRESS:
      const updatedAddresses = state.addresses.map((address) =>
        address.id === action.payload.addressId
          ? { ...address, ...action.payload.updatedAddress }
          : address
      );
      return {
        ...state,
        addresses: updatedAddresses,
      };

    case actionTypes.REMOVE_ADDRESS:
      const filteredAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      return {
        ...state,
        addresses: filteredAddresses,
      };

    case actionTypes.SET_ADDRESS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SET_ADDRESS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
