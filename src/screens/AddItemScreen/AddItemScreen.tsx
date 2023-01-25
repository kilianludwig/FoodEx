import * as sc from './/AddItemScreen.sc';
import React, {FunctionComponent, useState, useContext} from 'react';
import {Spacer} from '../../utils/Spacer/Spacer';
import {MainButton} from '../../components/MainButton/MainButton';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../../services/authentication/authentication.context';

// https://www.youtube.com/watch?v=1GpOS5mrGHI&t=630s

export const AddItemScreen: FunctionComponent = ({navigation, route}) => {
  const {user} = useContext(AuthenticationContext);

  const [expiration, setExpiration] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Linz');

  const [uploading, setUploading] = useState(false);

  const uploadItem = async () => {
    const imgUrl = await uploadImage();
    const itemID = generateNewID();

    // console.log(user.uid);
    // console.log(imgUrl);
    // console.log(title);
    // console.log(expiration);
    // console.log(imgUrl + '_item');

    firestore()
      .collection('Items')
      .add({
        itemID: itemID,
        userID: user.uid,
        image: imgUrl,
        title: title,
        expiration: expiration,
        location: location,
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
      <sc.ButtonContainer>
        <MainButton
          title={'Choose Category'}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </sc.ButtonContainer>
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
