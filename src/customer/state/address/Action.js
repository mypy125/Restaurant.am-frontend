import * as actionTypes from './ActionType';

export const addAddress = (address) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    payload: address,
  };
};

export const updateAddress = (addressId, updatedAddress) => {
  return {
    type: actionTypes.UPDATE_ADDRESS,
    payload: { addressId, updatedAddress },
  };
};

export const removeAddress = (addressId) => {
  return {
    type: actionTypes.REMOVE_ADDRESS,
    payload: addressId,
  };
};

export const setAddressLoading = (isLoading) => {
  return {
    type: actionTypes.SET_ADDRESS_LOADING,
    payload: isLoading,
  };
};

export const setAddressError = (error) => {
  return {
    type: actionTypes.SET_ADDRESS_ERROR,
    payload: error,
  };
};
