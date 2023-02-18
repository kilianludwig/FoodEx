import React, {useContext} from 'react';
import * as sc from './ProfileScreen.sc';
import {UserCard} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {Spacer} from '../../utils/Spacer/Spacer';
import {Alert} from 'react-native';

export const ProfileScreen = ({navigation}) => {
  const {onLogout} = useContext(AuthenticationContext);

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

  return (
    <sc.ProfileScreen>
      <UserCard></UserCard>
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
        <MainButton title={'Log Out'} onPress={handleLogout} />
      </sc.LogOutButtonContainer>
    </sc.ProfileScreen>
  );
};
