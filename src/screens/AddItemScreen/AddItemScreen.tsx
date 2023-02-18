import * as sc from './/AddItemScreen.sc';
import React, {FunctionComponent, useState, useContext, useEffect} from 'react';
import {Spacer} from '../../utils/Spacer/Spacer';
import {MainButton} from '../../components/MainButton/MainButton';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator, Alert, Platform, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import Geolocation from '@react-native-community/geolocation';

// Geolocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: 'whenInUse',
//   locationProvider: 'auto',
// });

// Firebase Integration:
// https://www.youtube.com/watch?v=1GpOS5mrGHI&t=630s

export const AddItemScreen: FunctionComponent = ({navigation, route}) => {
  const {user} = useContext(AuthenticationContext);

  const [expiration, setExpiration] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Altenberger Straße 69, Linz');

  const [longitude, setLongitude] = useState('...');
  const [latitude, setLatitude] = useState('...');
  // const [locationStatus, setLocationStatus] = useState('');

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        // TODO Android Permission handling
      }
    };
    requestLocationPermission();
    return () => {};
  });

  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location...');
    Geolocation.getCurrentPosition(
      position => {
        // setLocationStatus('This is your Location');
        const currLongitude = JSON.stringify(
          Math.round(position.coords.longitude * 100) / 100,
        );
        const currLatitude = JSON.stringify(
          Math.round(position.coords.latitude * 100) / 100,
        );

        setLongitude(currLongitude);
        setLatitude(currLatitude);
      },
      error => {
        console.log(error);
        // setLocationStatus(error.message);
      },
    );
    return;
  };

  const uploadItem = async () => {
    const imgUrl = await uploadImage();
    const itemID = generateNewID();

    firestore()
      .collection('Items')
      .add({
        itemID: itemID,
        userID: user.uid,
        image: imgUrl,
        title: title,
        expiration: expiration,
        location: location,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        Alert.alert(`${title} Upload Done!`, 'Your food is now online! :)');
        setTimeout(() => {
          navigation.navigate('MyItemsScreen');
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function generateNewID(): string {
    const possibleCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 18; i++) {
      randomString += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length),
      );
    }
    return randomString;
  }

  const uploadImage = async () => {
    const uploadUri = 'file://' + route.params.data.path;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    setUploading(true);
    try {
      // upload image to storage ref
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <sc.AddItemScreen>
      <sc.PreviewContainer>
        <sc.ItemPreview elevation={2}>
          <sc.ItemPreviewCover
            source={{
              uri: 'file://' + route.params.data.path,
            }}></sc.ItemPreviewCover>
        </sc.ItemPreview>
      </sc.PreviewContainer>
      {/*<Image*/}
      {/*  style={{width: '100%', height: '50%'}}*/}
      {/*  source={{uri: 'file://' + route.params.data.path}}*/}
      {/*/>*/}
      {/*<sc.ButtonContainer>*/}
      {/*  <MainButton*/}
      {/*    title={'Choose Category'}*/}
      {/*    onPress={() => navigation.navigate('SearchScreen')}*/}
      {/*  />*/}
      {/*</sc.ButtonContainer>*/}
      <sc.InputContainer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Title"
            value={title}
            onChangeText={ttl => setTitle(ttl)}
          />
        </Spacer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Expiration Date"
            value={expiration}
            onChangeText={expr => setExpiration(expr)}
          />
        </Spacer>
      </sc.InputContainer>

      <sc.LocationInfoContainer>
        <sc.LocationInfoCard>
          <sc.LocationInfo>
            <sc.TextInfo>Your Longitude is: {longitude}</sc.TextInfo>
            <sc.TextInfo>Your Latitude is: {latitude}</sc.TextInfo>
            <sc.TextInfo> </sc.TextInfo>
            <sc.BigTextInfo>Location: {location}</sc.BigTextInfo>
          </sc.LocationInfo>
        </sc.LocationInfoCard>
      </sc.LocationInfoContainer>
      {uploading ? (
        <sc.UploadButtonContainer>
          <ActivityIndicator size="large" color="#000000" />
        </sc.UploadButtonContainer>
      ) : (
        <sc.UploadButtonContainer>
          <MainButton title={'Upload'} onPress={uploadItem} />
        </sc.UploadButtonContainer>
      )}
    </sc.AddItemScreen>
  );
};
