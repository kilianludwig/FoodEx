import * as React from 'react';
import * as sc from './CategoryItem.sc';
import {Spacer} from '../../utils/Spacer/Spacer';

interface CategoryItemProps {
  id?: string;
  title: string;
  onPress?: (id: string) => void;
}

export const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  id,
  title,
  onPress,
}) => {
  return (
    <sc.CategoryItem elevation={1} onPress={() => onPress?.(id)}>
      <sc.CategoryContent>
        <sc.CategoryIcon source={require('../../assets/images/banana.jpg')} />
        <sc.CategoryTitle>{title}</sc.CategoryTitle>
      </sc.CategoryContent>
    </sc.CategoryItem>
  );
};
