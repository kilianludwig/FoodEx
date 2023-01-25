import * as sc from './/AddItemScreen.sc';
import React, {FunctionComponent, useState} from 'react';
import {Spacer} from '../../utils/Spacer/Spacer';
import {MainButton} from '../../components/MainButton/MainButton';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator, Alert} from 'react-native';
import firebase from 'firebase/compat';
import {initializeApp} from 'firebase/app';

// https://www.youtube.com/watch?v=1GpOS5mrGHI&t=630s

export const AddItemScreen: FunctionComponent = ({navigation, route}) => {
  const [expiration, setExpiration] = useState('');
  const [title, setTitle] = useState('');

  const [uploading, setUploading] = useState(false);

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
      // TODO Take Food Item Name and iinsert here
      Alert.alert(
        'Image uploaded!',
        'Your Food is now online visible to all other users!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const uploadItem = async () => {
    const imgUrl = await uploadImage();
    console.log(imgUrl);
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
