import * as sc from './ItemScreen.sc';
import React from 'react';
import {ListItem} from '../../components/ListItem/ListItem';
import {UserCard} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import {RequestButtonContainer} from './ItemScreen.sc';

export const ItemScreen = ({navigation}) => {
  return (
    <sc.ItemScreen>
      <UserCard></UserCard>
      <ListItem title={'Banana'} distance={'0.3'} expiration={'10.04.23'} />
      <sc.RequestButtonContainer>
        <MainButton
          onPress={() => navigation.navigate('ListScreen')}
          title={'Request Pick-Up'}
        />
      </sc.RequestButtonContainer>
    </sc.ItemScreen>
  );
};
