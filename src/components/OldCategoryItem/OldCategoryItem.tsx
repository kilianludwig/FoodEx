import React from 'react';
import * as sc from './/OldCategoryItem.sc';

interface ListElementProps {
  title: string;
  onPress?: () => void;
}

export const OldCategoryItem: React.FunctionComponent<ListElementProps> = ({
  title,
  onPress,
}) => {
  return (
    <sc.CategoryElement onPress={onPress}>
      <sc.ImageView>
        <sc.ItemImage
          source={require('../../assets/images/banana.jpg')}></sc.ItemImage>
      </sc.ImageView>
      <sc.TitleView>
        <sc.ItemTitle>{title}</sc.ItemTitle>
      </sc.TitleView>
    </sc.CategoryElement>
  );
};
