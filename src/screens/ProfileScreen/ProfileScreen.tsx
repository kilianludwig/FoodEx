import React, {useContext, useEffect, useState} from 'react';
import * as sc from './ProfileScreen.sc';
import {UserCard, userItem} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {Spacer} from '../../utils/Spacer/Spacer';
import {Alert, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ProfileScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);
  const [chosenUser, setChosenUser] = useState<userItem>({
    userID: user.uid,
    fullName: user.displayName,
    email: user.email,
    address: '',
    number: '',
    picture: '',
  });

  const handleLogout = () => {
    Alert.alert(
      'Are you sure to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: onLogout,
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    async function getUser(userUid: string) {
      try {
        const doc = await firestore().collection('Users').doc(userUid).get();
        if (doc.exists) {
          const userData = doc.data();
          setChosenUser(prevUser => ({
            ...prevUser,
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
    getUser(user.uid);
  }, [user.uid]);

  return (
    <sc.ProfileScreen>
      <UserCard user={chosenUser}></UserCard>
      <Spacer size={'medium'}></Spacer>
      <MainButton
        title={'My Items'}
        onPress={() => navigation.navigate('MyItemsScreen')}
      />
      <MainButton
        title={'My Requests'}
        onPress={() => navigation.navigate('RequestsScreen')}
      />
      <MainButton
        title={'Settings'}
        onPress={() => navigation.navigate('SettingsScreen')}
      />
      <sc.LogOutButtonContainer>
        <TouchableOpacity onPress={handleLogout}>
          <sc.LogOutButton elevation={1}>
            <sc.LogOutButtonTitle>Log Out</sc.LogOutButtonTitle>
          </sc.LogOutButton>
        </TouchableOpacity>
      </sc.LogOutButtonContainer>
    </sc.ProfileScreen>
  );
};
