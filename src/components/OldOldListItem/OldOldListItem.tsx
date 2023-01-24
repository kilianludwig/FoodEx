import React from 'react';
import * as sc from './OldOldListItem.sc';

interface ListElementProps {
  title: string;
  onPress?: () => void;
}

export const OldOldListItem: React.FunctionComponent<ListElementProps> = ({
  title,
  onPress,
}) => {
  return (
    <sc.ListElement onPress={onPress}>
      <sc.ImageView>
        <sc.ItemImage
          source={require('../../assets/images/banana.jpg')}></sc.ItemImage>
      </sc.ImageView>
      <sc.TitleView>
        <sc.ItemTitle>{title}</sc.ItemTitle>
      </sc.TitleView>
      <sc.InfoView>
        <sc.ItemInfo>200m</sc.ItemInfo>
        <sc.ItemInfo>24.12.22</sc.ItemInfo>
      </sc.InfoView>
    </sc.ListElement>
  );
};
