import React from 'react';
import * as sc from './RoundedButton.sc';

interface RoundedButtonProps {
  title: string;
  onPress?: () => void;
}

export const RoundedButton: React.FunctionComponent<RoundedButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <sc.RoundedButton onPress={onPress}>
      <sc.Title>{title}</sc.Title>
    </sc.RoundedButton>
  );
};
