import * as React from 'react';
import {ListMenu} from '../../components/ListMenu/ListMenu';
import {MainMenu} from '../../components/MainMenu/MainMenu';
import * as sc from './OldOldListScreen.sc';
import {OldListItemWrapper} from '../../components/OldListItemWrapper/OldListItemWrapper';

export const OldOldListScreen = () => {
  return (
    <sc.ListScreen>
      <OldListItemWrapper />
      <sc.Menues>
        <ListMenu />
        <MainMenu />
      </sc.Menues>
    </sc.ListScreen>
  );
};
