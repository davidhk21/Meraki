const initialState = {
  counter: 0,
  results: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + action.val,
      }
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: state.counter}),
      }
    case 'DELETE_RESULT':
      const newArr = state.results.filter(result => result.id !== action.resultElId)
      return {
        ...state,
        results: newArr,
      }
  }
  return state;
}

export default reducer;