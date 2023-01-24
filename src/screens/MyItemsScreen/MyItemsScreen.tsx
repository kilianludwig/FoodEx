import * as sc from './/MyItemsScreen.sc';
import React from 'react';
import {MainButton} from '../../components/MainButton/MainButton';

export const MyItemsScreen = ({navigation}) => {
  return (
    <sc.MyItemsScreen>
      <MainButton
        title={'Add Item'}
        onPress={() => navigation.navigate('CameraScreen')}
      />
    </sc.MyItemsScreen>
  );
};
