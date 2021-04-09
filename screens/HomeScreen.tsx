import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Search from '../components/Search';
import { Text, View } from '../components/Themed';
import { HomeParamList } from '../types';

export default function HomeScreen({
  navigation,
}: StackScreenProps<HomeParamList>) {
  return (
    <Search navigation={navigation}/>
  );
}

const styles = StyleSheet.create({
});
