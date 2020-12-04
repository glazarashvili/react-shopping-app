import * as actionTypes from "../actionTypes/cartActionTypes";

const cartReducer = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.REMOVE_FROM_CART: {
        
      }
       default:
        return state;
    }
};
  
export default cartReducer;
