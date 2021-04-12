import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, FavoriteParamList, HomeParamList, SearchParamList, TabTwoParamList } from '../types';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { Button } from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Accueil"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" color={color} size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Recherche"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favoris"
        component={FavoriteNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-heart" color={color} size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: '\u00c0 la une' }}
      />
      <HomeStack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{ headerTitle: 'Article' }}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Test' }}
      />
    </TabTwoStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Recherche' }}
      />
      <SearchStack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{ headerTitle: 'Article' }}
      />
    </SearchStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator<FavoriteParamList>();

function FavoriteNavigator() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{ headerTitle: 'Enregistrés' }}
      />
      <HomeStack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{ headerTitle: 'Article' }}
      />
    </FavoriteStack.Navigator>
  );
}


