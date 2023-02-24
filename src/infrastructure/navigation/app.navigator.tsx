import React from 'react';
import {ListScreen} from '../../screens/ListScreen/ListScreen';
import {ItemScreen} from '../../screens/ItemScreen/ItemScreen';
import {SearchScreen} from '../../screens/SearchScreen/SearchScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {MyItemsScreen} from '../../screens/MyItemsScreen/MyItemsScreen';
import {RequestsScreen} from '../../screens/RequestsScreen/RequestsScreen';
import {SettingsScreen} from '../../screens/SettingsScreen/SettingsScreen';
import {AddItemScreen} from '../../screens/AddItemScreen/AddItemScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeArea} from '../../utils/SafeArea/SafeArea';
import {CameraScreen} from '../../screens/CameraScreen/CameraScreen';
import {ProfileCamScreen} from '../../screens/ProfileCamScreen/ProfileCamScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <SafeArea>
    <Stack.Navigator initialRouteName="ListScreen">
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{title: 'Item'}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{title: 'Choose Category'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="MyItemsScreen"
        component={MyItemsScreen}
        options={{title: 'My Items'}}
      />
      <Stack.Screen
        name="RequestsScreen"
        component={RequestsScreen}
        options={{title: 'My Requests'}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{title: 'Take Picture'}}
      />
      <Stack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{title: 'Add Item'}}
      />
    </Stack.Navigator>
  </SafeArea>
);
