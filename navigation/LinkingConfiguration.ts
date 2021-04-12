import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
              ArticleDetailScreen: 'article',
              SearchScreen: 'search',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'search',
            },
          },
          Favorite: {
            screens: {
              FavoriteScreen: 'favorite',
              ArticleDetailScreen: 'article',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
