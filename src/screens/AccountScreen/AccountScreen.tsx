import React from 'react';

import * as sc from './AccountScreen.sc';
import {MainButton} from '../../components/MainButton/MainButton';

export const AccountScreen = ({navigation}) => {
  return (
    <sc.AccountBackground>
      <sc.AccountBackgroundOpacity />
      <sc.MainLogo
        source={require('../../assets/images/logo.png')}
        resizeMode={'contain'}
      />
      <sc.AccountContainer>
        <sc.ButtonContainer>
          <MainButton
            title={'Login'}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </sc.ButtonContainer>
        <sc.ButtonContainer>
          <MainButton
            title={'Register'}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </sc.ButtonContainer>
      </sc.AccountContainer>
    </sc.AccountBackground>
  );
};
