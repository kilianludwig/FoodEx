import * as sc from './/RequestsScreen.sc';
import React from 'react';
import {RequestCard} from '../../components/RequestCard/RequestCard';
import { FlatList } from "react-native";
import { REQUEST_DATA } from "../../assets/database/request_data";

export const RequestsScreen = ({navigation}) => {
  const renderItem = ({item}: any) => (
    <RequestCard sender_name={item.sender_name} item_name={item.item_name}></RequestCard>
  );

  return (
    <sc.RequestsScreen>
      <FlatList
        data={REQUEST_DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </sc.RequestsScreen>
  );
};
