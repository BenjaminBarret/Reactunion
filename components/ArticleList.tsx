import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Navigation from '../navigation'
import ArticleCard from './ArticleCard'

class ArticleList extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      articles: []
    }
  }

  // 
  _displayDetailArticle = (idArticle : string) => {
    console.log("Display film with id " + idArticle)
    this.props.navigation.navigate("ArticleDetailScreen", { idArticle: idArticle })
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.articles}
        extraData={this.props.favoritesArticle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
          <ArticleCard 
          article={item} 
          isArticleFavorite={(this.props.favoritesArticle.findIndex(article => article.id === item.id) !== -1) ? true : false}
          displayDetailArticle={this._displayDetailArticle}/>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = (state: { favoritesArticle: any }) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(ArticleList)