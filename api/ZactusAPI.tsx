export interface SimilarArticle {
  actor: string,
  link: string,
  time: number,
  id: string
}

export interface Article {
  id: string,
  title: string,
  link: string,
  description: string,
  picture: string,
  category: string,
  category_id: number,
  actor: string,
  time: number,
  local: boolean,
  similar_article: SimilarArticle[],
  nextId: string
}

const base_url = "http://zactus.re/api/";

export function getArticlesWithSearchedText (text : String){
  const url = base_url + 'search&query=' + text + '&limit=100'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getArticlesInTheSpotlight () {
  const url = base_url + 'une?limit=100'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getArticleWithId (id : String) {
  const url = base_url + 'article&id=' + id
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
