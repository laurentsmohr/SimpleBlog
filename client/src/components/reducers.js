const DEFAULT_STATE = {
  articles: [],
  current: null
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;