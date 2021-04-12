import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, Animated, Dimensions } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import FadeIn from '../animations/FadeIn'

interface Props {
  displayDetailArticle: any;
  article: any;
  isArticleFavorite: any;
}

interface State {
}

class ArticleItem extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props)

  }

  _displayFavoriteImage() {
    if (this.props.isArticleFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Ionicons name='heart' color='#ffffff80' size={100}/>
      )
    }
  }

  
  render() {

    const { article, displayDetailArticle } = this.props

    if (article.picture == "") {
      article.picture = "https://www.icone-png.com/png/29/28894.png"
    }

    return (
      <FadeIn>
        <Card containerStyle={{padding: 10}} >
          <Card.Title>{article.title}</Card.Title>
          <Card.Divider/>
          <Card.Image
            source={{uri:article.picture}} 
            PlaceholderContent={<ActivityIndicator />}
            style={styles.image}>
              {this._displayFavoriteImage()}
          </Card.Image>
          <Text 
            style={styles.description} 
            numberOfLines={3}>
              {article.description}
          </Text>
          
          <Button
            // icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={styles.button}
            title='Lire plus ...' 
            onPress={() => displayDetailArticle(article.id)}/>
        </Card>
      </FadeIn>
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
  },
  image:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ArticleItem