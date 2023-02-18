import * as sc from './/MyItemsScreen.sc';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import {Alert, FlatList, RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {listItem} from '../ListScreen/ListScreen';

export const MyItemsScreen = ({navigation}) => {
  const authContext = useContext(AuthenticationContext);
  const currUserId = authContext.user ? authContext.user.uid : null;

  const [items, setItems] = useState<listItem[] | undefined>(undefined);

  const fetchItems = async (userId: string) => {
    try {
      const list: listItem[] = [];

      await firestore()
        .collection('Items')
        .orderBy('postTime', 'desc')
        .where('userID', '==', userId)
        .get()
        .then(QuerySnapshot => {
          // console.log(QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {userID, image, title, expiration, location} = doc.data();
            list.push({
              itemID: doc.id,
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
    fetchItems(currUserId);
  }, []);

  // Pull-down-to-refresh functionality
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = useCallback(() => {
    setRefreshing(true);
    fetchItems(currUserId);
    setRefreshing(false);
  }, []);

  return (
    <sc.MyItemsScreen>
      <MainButton
        title={'Add Item'}
        onPress={() => navigation.navigate('CameraScreen')}
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
    </sc.MyItemsScreen>
  );
};
