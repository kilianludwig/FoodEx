import React from 'react';
import {RoundedButton} from '../RoundedButton/RoundedButton';
import * as sc from './ListMenu.sc';

export const ListMenu = () => {
  return (
    <sc.ListMenu>
      <RoundedButton title="Dist" />
      <RoundedButton title="Alph" />
      <RoundedButton title="Expire" />
    </sc.ListMenu>
  );
};
