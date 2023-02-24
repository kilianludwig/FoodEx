import * as sc from './ItemScreen.sc';
import React, {useContext, useEffect, useState} from 'react';
import {ListItem} from '../../components/ListItem/ListItem';
import {UserCard, userItem} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import storage from '@react-native-firebase/storage';

export const ItemScreen = ({navigation, route}) => {
  const authContext = useContext(AuthenticationContext);
  const currUserId = authContext.user ? authContext.user.uid : null;
  const currUserName = authContext.user ? authContext.user.displayName : null;

  const [deleting, setDeleting] = useState(false);

  console.log(route.params.data.userID);

  const [chosenUser, setChosenUser] = useState<userItem>({
    userID: route.params.data.userID,
    fullName: '',
    email: '',
    address: '',
    number: '',
    picture: 'https://de.m.wikipedia.org/wiki/Datei:Solid_white.svg',
  });

  useEffect(() => {
    async function getUser(userUid: string) {
      try {
        const doc = await firestore().collection('Users').doc(userUid).get();
        if (doc.exists) {
          const userData = doc.data();
          setChosenUser(prevUser => ({
            ...prevUser,
            fullName: userData.displayName,
            email: userData.email,
            address: userData.address,
            number: userData.phoneNumber,
            picture: userData.picture,
          }));
        } else {
          console.log('User data not found');
        }
      } catch (error) {
        console.log('Error retrieving user data:', error);
      }
    }
    getUser(route.params.data.userID);
  }, [route.params.data.userID]);

  const handleDelete = (itemID: string) => {
    Alert.alert(
      'Are you sure to delete this item?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deletePost(itemID),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (itemID: string) => {
    setDeleting(true);
    firestore()
      .collection('Items')
      .doc(itemID)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {image} = documentSnapshot.data();

          if (image != null) {
            const storageRef = storage().refFromURL(image);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                deleteFirestoreData(itemID);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the item image is not available
          } else {
            deleteFirestoreData(itemID);
          }
        }
      });
  };

  const deleteFirestoreData = (itemID: string) => {
    firestore()
      .collection('Items')
      .doc(itemID)
      .delete()
      .then(() => {
        setDeleting(false);
        Alert.alert('Item successfully deleted!', '');
        setTimeout(() => {
          navigation.navigate('MyItemsScreen');
        }, 500);
      })
      .catch(e => console.log('Error deleting item data.', e));
  };

  //console.log('route.params.data');
  // console.log(route.params.data);
  // console.log('route.params.data.itemID');
  // console.log(route.params.data.itemID);

  const sendRequest = async () => {
    firestore()
      .collection('Requests')
      .add({
        senderID: currUserId,
        senderName: currUserName,
        senderNumber: '000',
        receiverID: route.params.data.userID,
        itemID: route.params.data.itemID,
        requestTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        Alert.alert(`Request successful!`, '');
        console.log(route.params.data);
        //setTimeout(() => {
        //  navigation.navigate('MyItemsScreen');
        //}, 500);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <sc.ItemScreen>
      <UserCard user={chosenUser}></UserCard>
      <ListItem item={route.params.data} />
      {deleting ? (
        <sc.ButtonContainer>
          <ActivityIndicator size="large" color="#000000" />
        </sc.ButtonContainer>
      ) : (
        <sc.ButtonContainer>
          {route.params.data.userID == currUserId ? (
            <TouchableOpacity
              onPress={() => handleDelete(route.params.data.itemID)}>
              <sc.DeleteButton elevation={1}>
                <sc.DeleteButtonTitle>Delete Item</sc.DeleteButtonTitle>
              </sc.DeleteButton>
            </TouchableOpacity>
          ) : (
            <MainButton
              onPress={() => sendRequest()}
              title={'Request Pick-Up'}
            />
          )}
        </sc.ButtonContainer>
      )}
    </sc.ItemScreen>
  );
};
