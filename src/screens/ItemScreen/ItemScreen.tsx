import * as sc from './ItemScreen.sc';
import React, {useContext} from 'react';
import {ListItem} from '../../components/ListItem/ListItem';
import {UserCard} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Alert} from 'react-native';
import {AuthenticationContext} from '../../services/authentication/authentication.context';

export const ItemScreen = ({navigation, route}) => {
  const authContext = useContext(AuthenticationContext);
  const currUserId = authContext.user ? authContext.user.uid : null;

  const deleteItem = async (itemID: string) => {
    try {
      // get item reference object
      const itemRef = firestore().collection('Items').doc(itemID);
      // get item title
      const itemDoc = await itemRef.get();
      // const itemData = itemDoc.data();
      // const itemTitle = itemData.title;
      // delete item
      await itemRef.delete();
      // display result
      Alert.alert(`Item successfully deleted!`);
    } catch (error) {
      Alert.alert(`Error!`, `${error}`);
    }
  };

  const deleteFirestoreData = (itemID: string) => {
    firestore()
      .collection('Items')
      .doc(itemID)
      .delete()
      .then(() => {
        Alert.alert('Item successfully deleted!', `itemID! ${itemID}`);
      })
      .catch(e => console.log('Error deleting post.', e));
  };

  console.log('route.params.data');
  console.log(route.params.data);
  // console.log(currUserId);
  // console.log(route.params.data.userID);

  return (
    <sc.ItemScreen>
      <UserCard></UserCard>
      <ListItem item={route.params.data} />
      <sc.ButtonContainer>
        {route.params.data.userID == currUserId ? (
          <MainButton
            onPress={() => deleteFirestoreData('NBKgWOKTwlvULgCS6EgU')}
            title={'Delete Item'}
          />
        ) : (
          <MainButton
            onPress={() => navigation.navigate('ListScreen')}
            title={'Request Pick-Up'}
          />
        )}
      </sc.ButtonContainer>
    </sc.ItemScreen>
  );
};
