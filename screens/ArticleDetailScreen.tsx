import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import ArticleDetail from '../components/ArticleDetail';

import { Text, View } from '../components/Themed';
import { HomeParamList } from '../types';

export default function ArticleDetailScreen({ route } : any) {

  const { idArticle, navigation } = route.params;

  return (
    <ArticleDetail idArticle={idArticle}/>
  );

}

const styles = StyleSheet.create({
});
