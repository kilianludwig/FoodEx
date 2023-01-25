import * as sc from './/MyItemsScreen.sc';
import React, {useContext, useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../../services/authentication/authentication.context';

export const MyItemsScreen = ({navigation}) => {
  const {user} = useContext(AuthenticationContext);

  const [items, setItems] = useState(null);

  console.log(user.userID);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const list = [];

        await firestore()
          .collection('Items')
          .where('userID', '==', user.userID)
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

  return (
    <sc.MyItemsScreen>
      <MainButton
        title={'Add Item'}
        onPress={() => navigation.navigate('CameraScreen')}
      />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} onPress={navigation.navigate('ItemScreen')} />
        )}
        keyExtractor={item => item.userID}
      />
    </sc.MyItemsScreen>
  );
};
