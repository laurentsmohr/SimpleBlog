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

export const currentArticle = (state = null, action) => {
  switch (action.type) {
      case 'FETCH_ARTICLE_SUCCESS':
        return action.data.article;

      case 'EDIT_ARTICLE':
        return action.article;

      case 'RESET_CURRENT_ARTICLE':
        return null;

      default: 
        return state;
    }
};

export const currentComments = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ARTICLE_SUCCESS':
      return action.data.comments;
  
    case 'CREATE_COMMENT':
      return [...state, action.comment];

    case 'RESET_CURRENT_ARTICLE':
      return [];

    default: 
      return state;
  }
}

export const articles = (state = [], action) => {
  switch (action.type) {
      case 'FETCH_ALL_ARTICLES_SUCCESS':
        return action.articles;

      case 'CREATE_ARTICLE':
        return [...state, action.article];

      case 'EDIT_ARTICLE':
        return state.map(article => {
          if(article.id === action.article.id) {
            return Object.assign({}, action.article);
          } else {
            return article;
          }
        })

      case 'DELETE_ARTICLE':
        let index; 
        for(let i = 0; i < state.length; i++) {
          if(state[i].id === action.id) {
            index = i;
          }
        }
        state.splice(index, 1);
        return [...state];

      default:
        return state;
    }  
};
