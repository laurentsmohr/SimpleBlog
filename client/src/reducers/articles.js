// const DEFAULT_STATE = {
//   articles: [],
//   current: null,
// };

// const rootReducer = (state = DEFAULT_STATE, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// export default rootReducer;

export const current = (state = null, action) => {
  switch (action.type) {
      case 'FETCH_ARTICLE_SUCCESS':
        return action.article;
      
      case 'CREATE_COMMENT':
        let newState = Object.assign({}, state);
        newState.comments.push(action.comment);
        return newState;

      default: 
        return state;
    }
};

export const articles = (state = [], action) => {
  switch (action.type) {
      case 'FETCH_ALL_ARTICLES_SUCCESS':
        return action.articles;

      case 'CREATE_ARTICLE':
        return [action.article, ...state];

      case 'EDIT_ARTICLE':
        let newState = state.map(article => {
          if(article.id === action.article.id) {
            return action.article;
          } else {
            return article;
          }
        })
        return newState;

      case 'DELETE_ARTICLE':
        let index; 
        for(let i = 0; i < state.length; i++) {
          if(state[i].id === action.id) {
            index = i;
          }
        }
        state.splice(i, 1);
        return state;

      default:
        return state;
    }  
};
