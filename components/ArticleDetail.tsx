import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Platform, Share} from 'react-native';
import { Button } from 'react-native-elements';
import { getArticleWithId } from '../api/ZactusAPI';

import { connect } from 'react-redux'

import { Text, View } from '../components/Themed';
import EnlargeShrink from '../animations/EnlargeShrink';
import { Ionicons } from '@expo/vector-icons';
import articleReducer from '../Store/Reducers/ArticleReducer';
import SimilarArticleList from './SimilarArticleList';

interface Props {
  idArticle: any;
  favoritesArticle: any;
  dispatch: any;
}

interface State {
  article: any;
  isLoading: any;
}

class ArticleDetail extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props)

    this.state = {
      article: undefined,
      isLoading: true 
    }
    this._shareArticle = this._shareArticle.bind(this)
  }

  // static navigationOptions = ({ navigation }) => {
  //   const { params } = navigation.state
  //   // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
  //   if (params.article != undefined && Platform.OS === 'ios') {
  //     return {
  //         // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
  //         headerRight: <TouchableOpacity
  //                         style={styles.share_touchable_headerrightbutton}
  //                         onPress={() => params._shareArticle()}>
  //                         <Image
  //                           style={styles.share_image}
  //                           source={require('../assets/images/ic_share.ios.png')} />
  //                       </TouchableOpacity>
  //     }
  //   }
  // }

  // _updateNavigationParams() {
  //   console.log()
  //   this.props.navigation.setParams({
  //     shareArticle: this._shareArticle,
  //     article: this.state.article
  //   })
  // }

  componentDidMount() {
    getArticleWithId(this.props.idArticle).then(data => {
      this.setState({
        article: data[0],
        isLoading: false
      }
      // , () => { this._updateNavigationParams() }
      )
    })
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.article }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../assets/images/ic_favorite_border.png')
    var shouldEnlarge = false
    if (this.props.favoritesArticle.findIndex((item: { id: any; }) => item.id === this.state.article.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../assets/images/ic_favorite.png')
      shouldEnlarge = true
    }
    return (
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displaySimilarArticle() {
    if (this.state.article.similar_article) {
      return (
        <SimilarArticleList
        similar_article={this.state.article.similar_article} // C'est bien le component Search qui récupère les articles depuis l'API et on les transmet ici pour que le component ArticleList les affiche
        />
      )
    }
  }

  _displayArticle() {

    const { article } = this.state
    
    if (article != undefined) {

      if (article.picture == "") {
        article.picture = "https://www.icone-png.com/png/29/28894.png"
      }

      if (article.actor == "zinfos974" && article.link[8] ==="m"){
        console.log(article.link[8])
        article.link = article.link.slice(0, 8 - 1) 
            + article.link.slice(10, article.link.length);
      }

      return (
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri:article.picture}}
          />
          <View style={styles.main_content_container}>
            <Text style={styles.title_text}>{article.title}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.details_container}>
              <View style={styles.categ_published_container}>
                <Text style={styles.default_text}>Categorie : {article.category}</Text>
                <Text style={styles.default_text}>Publié le {moment(article.time*1000).format('DD/MM/YYYY à hh:MM')}</Text>
                <Text style={styles.default_text}>Par {article.actor}</Text>
              </View>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={() => this._toggleFavorite()}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.share_touchable_headerrightbutton}
                onPress={() => this._shareArticle()}>
                <Ionicons name="share" size={40} />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.description_text}>{article.description}</Text>
            <Button
            icon={<Ionicons name='link' color='#ffffff' size={30}/>}
            buttonStyle={styles.button}
            title=' Lire tout l&apos;article'  
            onPress={() => Linking.openURL(article.link)}/>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {this._displaySimilarArticle()}
          </View>
        </View>
      )
    }
  }

  _shareArticle() {
      const { article } = this.state
      Share.share({ title: article.title, message: article.description })
  }

  _displayFloatingActionButton() {
    const { article } = this.state
    if (article != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareArticle()}>
          <Image
            style={styles.share_image}
            source={require('../assets/images/ic_share.android.png')} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    console.log(this.props)
    return (
      <ScrollView style={styles.scrollview_container}>
        {this._displayLoading()}
        {this._displayArticle()}
        {this._displayFloatingActionButton()}
      </ScrollView>
    )
  }
}
  
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  main_content_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categ_published_container:{
    marginLeft:0,
  },
  details_container:{
    flexDirection:'row',
    flex:1
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  favorite_image: {
    flex:1,
    width: null,
    height: null
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 300,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    color: '#667',
    flex:1,
    fontSize: 21,
    flexWrap: 'wrap',
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 30,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  button: {
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

const mapStateToProps = (state: any) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(ArticleDetail)