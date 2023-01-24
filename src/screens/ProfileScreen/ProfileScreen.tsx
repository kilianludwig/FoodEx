import React, {useContext} from 'react';
import * as sc from './ProfileScreen.sc';
import {UserCard} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import { Spacer } from "../../utils/Spacer/Spacer";

export const ProfileScreen = ({navigation}) => {
  const {onLogout} = useContext(AuthenticationContext);

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
        <MainButton title={'Log Out'} onPress={onLogout} />
      </sc.LogOutButtonContainer>
    </sc.ProfileScreen>
  );
};
