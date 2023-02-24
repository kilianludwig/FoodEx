import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import React, {useContext, useRef} from 'react';
import * as sc from '../CameraScreen/CameraScreen.sc';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import storage from '@react-native-firebase/storage';
import {MainButton} from '../../components/MainButton/MainButton';
import {ActivityIndicator} from 'react-native-paper';

export const ProfileCamScreen = ({navigation, route}) => {
  const {onRegister, isLoading, error} = useContext(AuthenticationContext);

  const devices = useCameraDevices();
  const device = devices.front;

  const cameraRef = useRef<Camera>(null);

  React.useEffect(() => {
    requestCameraPermission();
  });

  const uploadImage = async (photo: string) => {
    const uploadUri = 'file://' + photo;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      // upload image to storage ref
      await task;

      const url = await storageRef.getDownloadURL();

      console.log(url);

      onRegister(
        route.params.email,
        route.params.password,
        route.params.repeatedPassword,
        route.params.name,
        route.params.number,
        route.params.address,
        url,
      );

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const takePicture = async () => {
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      }

      // console.log('Taking Picture...');

      const photo = await cameraRef.current.takePhoto({});

      // console.log(photo.path);

      uploadImage(photo.path);
    } catch (error) {
      console.log(error);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>Device is null</Text>
      </View>
    );
  }

  return (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <sc.ButtonContainer>
        {!isLoading ? (
          <TouchableOpacity onPress={takePicture}>
            <sc.CameraButton>
              <sc.Title>O</sc.Title>
            </sc.CameraButton>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator animating={true} />
        )}
      </sc.ButtonContainer>
    </>
  );
};
