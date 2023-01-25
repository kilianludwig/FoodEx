import * as sc from './/MyItemsScreen.sc';
import React from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import {FlatList} from 'react-native';
import {ITEM_DATA} from '../../assets/database/item_data';

export const MyItemsScreen = ({navigation}) => {
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
    <sc.MyItemsScreen>
      <MainButton
        title={'Add Item'}
        onPress={() => navigation.navigate('CameraScreen')}
      />
      {/*<FlatList*/}
      {/*  data={ITEM_DATA}*/}
      {/*  renderItem={item => renderItem(item)}*/}
      {/*  keyExtractor={item => item.id}*/}
      {/*/>*/}
    </sc.MyItemsScreen>
  );
};
