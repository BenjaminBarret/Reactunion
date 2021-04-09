const initialState = { favoritesArticle: [] }

function articleReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritesArticleIndex = state.favoritesArticle.findIndex(item => item.id === action.value.id)
      if (favoritesArticleIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesArticle: state.favoritesArticle.filter( (item, index) => index !== favoritesArticleIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesArticle: [...state.favoritesArticle, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default articleReducer