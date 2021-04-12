import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ArticleList from '../components/ArticleList';
import { Text, View } from '../components/Themed';

interface Props {
  navigation: any;
  favoritesArticle: any;
}

interface State {
}

class FavoriteScreen extends React.Component<Props,State> {

  _displayList(){
    if(this.props.favoritesArticle.length != 0 ) {
      return (
        <ArticleList
        articles={this.props.favoritesArticle}
        navigation={this.props.navigation}
      />
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Pas de favoris</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.text}>Vous n'avez pas encore enregistrer d'articles.</Text>
        </View>
      )
    }
  }

  render(){
    return (
      <View style={styles.container}>
        {this._displayList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

const mapStateToProps = (state: { favoritesArticle: any; }) => {
  return {
    favoritesArticle: state.favoritesArticle
  }
}

export default connect(mapStateToProps)(FavoriteScreen)