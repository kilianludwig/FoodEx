import React, {FunctionComponent} from 'react';
import * as sc from './MainButton.sc';
import {TouchableOpacity} from 'react-native';

interface MainButtonProps {
  onPress?: () => void;
  title: string;
}

// TODO Remove Touchable Opacity to achieve native Card feeling again,
//  unfortunately only the text is touchable that way

export const MainButton: FunctionComponent<MainButtonProps> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <sc.MainButton elevation={1}>
        <sc.MainButtonTitle>{title}</sc.MainButtonTitle>
      </sc.MainButton>
    </TouchableOpacity>
  );
};
