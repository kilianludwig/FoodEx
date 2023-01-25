import * as sc from './ListScreen.sc';
import {Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import firestore from '@react-native-firebase/firestore';
import firebase from 'firebase/compat';

export const ListScreen = ({navigation}) => {
  // hold all item data
  const [items, setItems] = useState(null);

  useEffect(() => {
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
    fetchItems();
  }, []);

  // const renderItem = ({item}: any) => (
  //   <ListItem
  //     id={item.id}
  //     title={item.title}
  //     distance={item.distance}
  //     expiration={item.expiration}
  //     onPress={id => navigation.navigate('ItemScreen')}
  //     image={item.image}
  //   />
  // );

  return (
    <sc.ListScreen>
      <MainButton
        title={'Search'}
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => navigation.navigate('ItemScreen', {data: item})}
          />
        )}
        keyExtractor={item => item.itemID}
      />
      <MainButton
        title={'Profile'}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
    </sc.ListScreen>
  );
};
