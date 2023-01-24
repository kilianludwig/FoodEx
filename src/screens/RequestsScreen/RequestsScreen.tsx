import * as sc from './/RequestsScreen.sc';
import React from 'react';
import {RequestCard} from '../../components/RequestCard/RequestCard';

export const RequestsScreen = ({navigation}) => {
  return (
    <sc.RequestsScreen>
      <RequestCard sender_name={'Isabella'} item_name={'Bananas'}></RequestCard>
    </sc.RequestsScreen>
  );
};
