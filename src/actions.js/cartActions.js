import * as actionTypes from "../actionTypes/cartActionTypes";

export const removeFromCart = ( product ) => ({
    type: actionTypes.ADD_GROUP,
    payload: {
      product
    }
  });