import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Image, Linking} from 'react-native';
import { Button } from 'react-native-elements';
import { getArticleWithId } from '../api/ZactusAPI';

import { Text, View } from '../components/Themed';

class ArticleDetail extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.state = {
      article: undefined,
      isLoading: true 
    }
  }


  componentDidMount() {
    getArticleWithId(this.props.idArticle).then(data => {
      this.setState({
        article: data[0],
        isLoading: false
      })
    })
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
          <Text style={styles.default_text}>Paru le {moment(article.time*1000).format('DD/MM/YYYY à hh:MM')}</Text>
          <Text style={styles.default_text}>Categorie : {article.category}</Text>
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

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayArticle()}
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  main_container: {
    flex: 1
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
})
  
  export default ArticleDetail