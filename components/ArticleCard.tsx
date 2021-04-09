import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'

class ArticleCard extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props)

  }

  _displayFavoriteImage() {
    if (this.props.isArticleFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../assets/images/ic_favorite.png')}
        />
      )
    }
  }

  
  render() {

    const { article, displayDetailArticle } = this.props

    if (article.picture == "") {
      article.picture = "https://www.icone-png.com/png/29/28894.png"
    }

    return (
      // implemented with Text and Button as children
      <Card containerStyle={{padding: 10}} >
        <Card.Title>{article.title}</Card.Title>
        <Card.Divider/>
        <Card.Image
          source={{uri:article.picture}} 
          PlaceholderContent={<ActivityIndicator />}>
        </Card.Image>
        <Text 
          style={styles.description} 
          numberOfLines={3}>
            {article.description}
        </Text>
        {this._displayFavoriteImage()}
        <Button
          // icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={styles.button}
          title='Lire plus ...' 
          onPress={() => displayDetailArticle(article.id)}/>
      </Card>
      // <View style={styles.main_container}>
      //   <Text style={styles.title_text}>Titre de l'article</Text>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 10
  },
  button: {
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
  // main_container: {
  //   height: 190
  // },
  // title_text: {
    
  // }
})

export default ArticleCard