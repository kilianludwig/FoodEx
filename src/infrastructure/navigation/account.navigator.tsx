import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountScreen} from '../../screens/AccountScreen/AccountScreen';
import {LoginScreen} from '../../screens/LoginScreen/LoginScreen';
import {RegisterScreen} from '../../screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator initialRouteName="AccountScreen">
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
