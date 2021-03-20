import * as actionTypes from '../actions.js';

const initialState = {
  results: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: action.result}),
      }
    case actionTypes.DELETE_RESULT:
      const newArr = state.results.filter(result => result.id !== action.resultElId)
      return {
        ...state,
        results: newArr,
      }
  }
  return state;
}

export default reducer;