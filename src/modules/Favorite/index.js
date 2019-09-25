import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import Swipeout from 'react-native-swipeout';

import {withApp} from '../../core/AppProvider';
import commonUtils from '../../utils/common';
import styles from './index.style';

const Favorite = ({myFavoritesStore}) => {
  const [myFavorites, setMyFavorites] = myFavoritesStore;
  const renderItem = ({item}) => {
    let swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: '#f0f',
        onPress: () => {
          const filtered = myFavorites.filter(
            myFavoriteItem => myFavoriteItem.seed !== item.seed,
          );

          setMyFavorites(filtered);
        },
      },
    ];
    return (
      <Swipeout right={swipeBtns} backgroundColor="transparent">
        <View style={styles.favoriteItem}>
          <Image
            source={{uri: item.user.picture}}
            style={styles.favoriteItemImage}
          />
          <View style={styles.infoView}>
            <Text style={styles.text}>
              {commonUtils.capitalizeLetter(
                Object.values(item.user.name).join(' '),
              )}
            </Text>
            <Text style={styles.text}>{item.user.email}</Text>
            <Text style={styles.text}>
              {commonUtils.capitalizeLetter(
                Object.values(item.user.location).join(', '),
              )}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  };

  if (!myFavorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Empty list!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      keyExtractor={item => item.seed}
      data={myFavorites}
      renderItem={renderItem}
    />
  );
};

export default withApp(Favorite);
