import * as sc from './ListScreen.sc';
import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import firestore from '@react-native-firebase/firestore';

export type listItem = {
  itemID: string;
  userID: string;
  image: string;
  title: string;
  expiration: string;
  location: string;
};

export const ListScreen = ({navigation}) => {
  // hold all item data
  const [items, setItems] = useState<listItem[] | undefined>(undefined);

  const fetchItems = async () => {
    try {
      const list: listItem[] = [];

      await firestore()
        .collection('Items')
        // TODO add expiration sorting
        .orderBy('postTime', 'desc')
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
    fetchItems();
  }, []);

  // Pull-down-to-refresh functionality
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = useCallback(() => {
    setRefreshing(true);
    fetchItems();
    console.log(items);
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
      <sc.ButtonContainer>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <sc.RoundButton elevation={1}>
            <sc.RoundButtonTitle>P</sc.RoundButtonTitle>
          </sc.RoundButton>
        </TouchableOpacity>
      </sc.ButtonContainer>
    </sc.ListScreen>
  );
};
