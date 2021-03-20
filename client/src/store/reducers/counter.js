import * as actionTypes from '../actions.js';

const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.val,
      }
  }
  return state;
}

export default reducer;