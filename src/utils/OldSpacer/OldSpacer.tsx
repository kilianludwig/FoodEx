import React from 'react';
import * as sc from './OldSpacer.sc';

export const OldSpacer = ({variant}: {variant: String}) => {
  if (variant === 'top.small') {
    return <sc.TopSmall />;
  }
  if (variant === 'top.medium') {
    return <sc.TopMedium />;
  }
  if (variant === 'top.large') {
    return <sc.TopLarge />;
  }
  if (variant === 'left.small') {
    return <sc.LeftSmall />;
  }
  if (variant === 'left.medium') {
    return <sc.LeftMedium />;
  }
  if (variant === 'left.large') {
    return <sc.LeftLarge />;
  }
};
