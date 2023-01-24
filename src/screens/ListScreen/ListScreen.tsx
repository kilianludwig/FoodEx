import * as sc from './ListScreen.sc';
import {Button, FlatList} from 'react-native';
import React from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ITEM_DATA} from '../../assets/database/item_data';
import {ListItem} from '../../components/ListItem/ListItem';

// TODO Use a Banner from rn paper to hide search bar and sort options

export const ListScreen = ({navigation}) => {
  const renderItem = ({item}: any) => (
    <ListItem
      id={item.id}
      title={item.title}
      distance={item.distance}
      expiration={item.expiration}
      onPress={id => navigation.navigate('ItemScreen')}
      image={item.image}
    />
  );

  return (
    <sc.ListScreen>
      <MainButton
        title={'Search'}
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <FlatList
        data={ITEM_DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
      <MainButton
        title={'Profile'}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
    </sc.ListScreen>
  );
};
