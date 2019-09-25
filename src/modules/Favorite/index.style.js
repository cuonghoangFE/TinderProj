import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
  },
  favoriteItem: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  favoriteItemImage: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  text: {
    flexWrap: 'wrap',
  },
});
