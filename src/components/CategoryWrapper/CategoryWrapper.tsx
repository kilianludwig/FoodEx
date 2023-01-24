import React from 'react';
import {CategoryItem} from '../CategoryItem/CategoryItem';
import * as sc from './CategoryWrapper.sc';
import {FlatList} from 'react-native';
import {CATEGORY_DATA} from '../../assets/database/category_data';

export const CategoryWrapper = () => {
  const renderItem = ({item}: any) => <CategoryItem title={item.title} />;

  return (
    <sc.CategoryWrapper>
      <FlatList
        data={CATEGORY_DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </sc.CategoryWrapper>
  );
};
