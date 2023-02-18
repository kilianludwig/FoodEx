import * as sc from './ListScreen.sc';
import {FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import firestore from '@react-native-firebase/firestore';

export const ListScreen = ({navigation}) => {
  // hold all item data
  const [items, setItems] = useState(null);

  const fetchItems = async () => {
    try {
      const list = [];

      await firestore()
        .collection('Items')
        .get()
        .then(QuerySnapshot => {
          // console.log(QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {itemID, userID, image, title, expiration, location} =
              doc.data();
            list.push({
              itemID: itemID,
              userID: userID,
              image: image,
              title: title,
              expiration: expiration,
              location: location,
            });
          });
        });
      setItems(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Pull-down-to-refresh functionality

  const [refreshing, setRefreshing] = useState(false);

  const refreshData = useCallback(() => {
    setRefreshing(true);
    fetchItems();
    setRefreshing(false);
  }, []);

  return (
    <sc.ListScreen>
      <MainButton
        title={'Search'}
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <FlatList
        data={items}
        keyExtractor={item => item.itemID}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => navigation.navigate('ItemScreen', {data: item})}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      />
      <MainButton
        title={'Profile'}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
    </sc.ListScreen>
  );
};
