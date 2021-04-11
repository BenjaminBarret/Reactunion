import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Platform, Share} from 'react-native';
import { Button } from 'react-native-elements';
import { getArticleWithId } from '../api/ZactusAPI';

import { connect } from 'react-redux'

import { Text, View } from '../components/Themed';
import EnlargeShrink from '../animations/EnlargeShrink';
import { Ionicons } from '@expo/vector-icons';

class ArticleDetail extends React.Component {
  
  constructor(props: {} | Readonly<{}>) {
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
    if (this.props.favoritesArticle.findIndex(item => item.id === this.state.article.id) !== -1) {
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

  _displayArticle() {

    const { article } = this.state
    
    if (article != undefined) {

      if (article.picture == "") {
        article.picture = "https://www.icone-png.com/png/29/28894.png"
      }

      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri:article.picture}}
          />
          <Text style={styles.title_text}>{article.title}</Text>
          <View style={styles.details_container}>
            <View>
              <Text style={styles.default_text}>Paru le {moment(article.time*1000).format('DD/MM/YYYY à hh:MM')}</Text>
              <Text style={styles.default_text}>Categorie : {article.category}</Text>
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
          <Text style={styles.description_text}>{article.description}</Text>
          <Button
          // icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={styles.button}
          title='Lire tout l&apos;article...'  
          onPress={() => Linking.openURL(article.link)}/>
          {/* <Text style={styles.default_text}>Article(s) similaire(s) : {article.genres.map(function(similarArticle){
              return similarArticle.title;
            }).join(" / ")}
          </Text> */}
        </ScrollView>
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
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayArticle()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  details_container:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
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
})

const mapStateToProps = (state: any) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(ArticleDetail)