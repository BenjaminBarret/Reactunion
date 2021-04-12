import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, Animated, Dimensions, Linking } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import FadeIn from '../animations/FadeIn'

interface Props {
  article: any;
}

interface State {
}

class SimilarArticleItem extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props)

  }

  
  render() {

    const { article } = this.props

    return (
      <FadeIn>
        <Card containerStyle={{ marginBottom: 15}}>
          <Card.Title>Par {article.actor}</Card.Title>
          <Card.Divider/>
          <Text style={styles.default_text}>Publié le {moment(article.time*1000).format('DD/MM/YYYY à hh:MM')}</Text>
          <Button
            icon={<Ionicons name='link' color='#ffffff' size={20}/>}
            buttonStyle={styles.button}
            title=' Aller vers le site' 
            onPress={() => Linking.openURL(article.link)}/>
        </Card>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 20
    },
    button: {
      borderRadius: 0, 
      marginLeft: 0, 
      marginRight: 0, 
      marginBottom: 0
    },
})

export default SimilarArticleItem