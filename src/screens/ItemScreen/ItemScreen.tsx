import * as sc from './ItemScreen.sc';
import React from 'react';
import {ListItem} from '../../components/ListItem/ListItem';
import {UserCard} from '../../components/UserCard/UserCard';
import {MainButton} from '../../components/MainButton/MainButton';
import {RequestButtonContainer} from './ItemScreen.sc';

export const ItemScreen = ({navigation, route}) => {
  return (
    <sc.ItemScreen>
      {/*TODO Get right user & Item ID based*/}
      <UserCard></UserCard>
      <ListItem item={route.params.data} />
      <sc.RequestButtonContainer>
        <MainButton
          onPress={() => navigation.navigate('ListScreen')}
          title={'Request Pick-Up'}
        />
      </sc.RequestButtonContainer>
    </sc.ItemScreen>
  );
};
