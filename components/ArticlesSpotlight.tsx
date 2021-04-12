import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { View } from './Themed';

import { getArticlesInTheSpotlight } from '../api/ZactusAPI'
import { connect } from 'react-redux';
import ArticleList from './ArticleList';

interface Props {
  navigation: any;
}

interface State {
  articlesSpotlight:any;
  isLoading:any;
}

class ArticleSpotlight extends React.Component<Props,State> {

  
  searchedText: any;

  constructor(props: Props) {
    super(props)
    
    this.state = { 
      articlesSpotlight : [],
      isLoading : false
    }

  }

  // 
  _displayDetailArticle = (idArticle : string) => {
    console.log("Display film with id " + idArticle)
    this.props.navigation.navigate("ArticleDetailScreen", { idArticle: idArticle, navigation : this.props.navigation})
  }

  // Charge la liste d'articles à la une
  _loadArticlesInTheSpotlight(){
    this.setState({ isLoading: true })

      getArticlesInTheSpotlight().then(data => {
        this.setState({ 
          articlesSpotlight: data,
          isLoading: false
        })
      });

  }

  // Charge l'actu à lancement du component
  componentDidMount(){
    this._loadArticlesInTheSpotlight();
  }

  // Affiche l'indicateur de chargement
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  // Affiche les articles à la une 
  _displayFlatlist() {
    return (
    <ArticleList
        articles={this.state.articlesSpotlight} // C'est bien le component Search qui récupère les articles depuis l'API et on les transmet ici pour que le component ArticleList les affiche
        navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component ArticleList de naviguer vers le détail d'un article
        />
    )
  }

  render() {
    return (

      <View 
        style={styles.container}>
        
        {this._displayLoading()}
        {this._displayFlatlist()}

      </View>

    )

  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    color:"#eee"
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state: { favoritesArticle: any; }) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(ArticleSpotlight)