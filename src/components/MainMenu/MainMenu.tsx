import React from 'react';
import {RoundedButton} from '../RoundedButton/RoundedButton';
import * as sc from './MainMenu.sc';

export const MainMenu = () => {
  return (
    <sc.MainMenu>
      <RoundedButton title="Profile" />
      <RoundedButton title="Map" />
      <RoundedButton title="Search" />
      <RoundedButton title="List" />
    </sc.MainMenu>
  );
};
