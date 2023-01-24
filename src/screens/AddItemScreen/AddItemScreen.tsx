import * as sc from './/AddItemScreen.sc';
import React, {FunctionComponent, useState} from 'react';
import {Spacer} from '../../utils/Spacer/Spacer';
import {MainButton} from '../../components/MainButton/MainButton';
// import storage from '@react-native-firebase/storage';
import firebase from 'firebase/compat';
import {initializeApp} from 'firebase/app';

export const AddItemScreen: FunctionComponent = ({navigation, route}) => {
  const [expiration, setExpiration] = useState('');
  const [title, setTitle] = useState('');

  const uploadItem = async () => {

  };


  //   const uploadUri = 'file://' + route.params.data.path;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  //   try {
  //     await storage().ref(filename).putFile(uploadUri);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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

      <sc.UploadButtonContainer>
        <MainButton title={'Upload'} onPress={uploadItem} />
      </sc.UploadButtonContainer>
    </sc.AddItemScreen>
  );
};
