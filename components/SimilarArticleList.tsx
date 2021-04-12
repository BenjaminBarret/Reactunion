import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import Navigation from '../navigation'
import ArticleItem from './ArticleItem'
import SimilarArticleItem from './SimilarArticleItem'

interface Props {
  similar_article: any;
}

interface State {
  similar_article:any
}

class SimilarArticleList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      similar_article: []
    }
  }

  render() {
    return (
      <ScrollView style={styles.list}>
        <FlatList
          data={this.props.similar_article}
          extraData={this.props.similar_article}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => 
            <SimilarArticleItem 
            article={item}/>
          }
        />
      </ScrollView>
      
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
  }
})


export default SimilarArticleList