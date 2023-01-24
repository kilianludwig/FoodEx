import React from 'react';
import {OldOldListItem} from '../OldOldListItem/OldOldListItem';
import * as sc from './OldListItemWrapper.sc';
import {FlatList} from 'react-native';
import {ITEM_DATA} from '../../assets/database/item_data';

export const OldListItemWrapper = () => {
  const renderItem = ({item}: any) => <OldOldListItem title={item.title} />;

  return (
    <sc.ListElementWrapper>
      <FlatList
        data={ITEM_DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </sc.ListElementWrapper>
  );
};
