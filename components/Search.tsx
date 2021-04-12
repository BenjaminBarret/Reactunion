import React from 'react'
import { StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import ArticleCard from './ArticleCard'
import { Text, View } from '../components/Themed';

import { getArticlesWithSearchedText, SimilarArticle, Article, getArticlesInTheSpotlight } from '../api/ZactusAPI'
import { connect } from 'react-redux';
import ArticleList from './ArticleList';

interface Props {
  navigation: any;
}

interface State {
  articlesSearched:any;
  isLoading:any;
}

class Search extends React.Component<Props,State> {

  
  searchedText: any;

  constructor(props: Props) {
    super(props)
    
    this.searchedText;
    this.state = { 
      articlesSearched : [],
      isLoading : false
    }

  }

  // 
  _displayDetailArticle = (idArticle : string) => {
    console.log("Display film with id " + idArticle)
    this.props.navigation.navigate("ArticleDetailScreen", { idArticle: idArticle, navigation : this.props.navigation})
  }

  // Recherche les articles à partir du texte
  _loadArticlesSearched() {

    console.log(this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
    this.setState({ isLoading:true })
    getArticlesWithSearchedText(this.searchedText).then(data => {
      this.setState({ 
        articlesSearched: data,
        isLoading: false
      })
    });
    
  }

  // Met à jour le texte du champ recherche d'articles
  _searchTextInputChanged (text : string) {
    this.searchedText = text
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

  // Affiche les articles à la une ou ceux recherchés
  _displayFlatlist() {

    if (this.searchedText != undefined && this.searchedText.length > 0) {
      return (
        <ArticleList
          articles={this.state.articlesSearched} // C'est bien le component Search qui récupère les articles depuis l'API et on les transmet ici pour que le component ArticleList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component ArticleList de naviguer vers le détail d'un article
         />
      )
    } else {
      return (
        <View style={styles.main_container}>
          <Text style={styles.title}>Faites une recherche</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.text}>Saississez un texte dans le champ de recherche.</Text>
        </View>
      )
    }

  }

  render() {
    return (

      <View 
        style={styles.container}>

        <TextInput 
          style={styles.textinput} 
          placeholder='Titre de l&apos;article'
          onChangeText={(text: string) => 
            this._searchTextInputChanged(text)
          }
          onSubmitEditing={() => 
            this._loadArticlesSearched()
          }
          clearButtonMode="always"
        />

        <Button
          title='Recherche' 
          onPress={() => this._loadArticlesSearched()}
        />
        
        {this._displayLoading()}
        {this._displayFlatlist()}

      </View>

    )

  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    marginTop: 12,
    color:"#eee"
  },
  textinput: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom:7,
    height: 50,
    borderColor: '#000000',
    borderWidth: 0.5,
    paddingLeft: 12,
    // borderRadius: 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
})

const mapStateToProps = (state: { favoritesArticle: any; }) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(Search)