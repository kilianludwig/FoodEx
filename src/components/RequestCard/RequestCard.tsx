import * as React from 'react';
import * as sc from './/RequestCard.sc';
import {requestItem} from '../../screens/RequestsScreen/RequestsScreen';
import {Alert, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

interface RequestProps {
  request: requestItem;
}

export const RequestCard: React.FunctionComponent<RequestProps> = ({
  request,
}) => {
  const deleteRequest = (requestID: string) => {
    firestore()
      .collection('Requests')
      .doc(requestID)
      .delete()
      .then(() => {})
      .catch(e => console.log(e));
  };

  const handleDelete = (itemID: string, requestID: string) => {
    Alert.alert(
      'Are you sure to accept this request?',
      'Your food upload will be deleted',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deletePostAndRequest(itemID, requestID),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const deletePostAndRequest = (itemID: string, requestID: string) => {
    firestore()
      .collection('Items')
      .doc(itemID)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {image} = documentSnapshot.data();

          if (image != null) {
            const storageRef = storage().refFromURL(image);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                deleteFirestoreData(itemID);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the item image is not available
          } else {
            deleteFirestoreData(itemID);
          }
        }
      });
    deleteRequest(requestID);
  };

  const deleteFirestoreData = (itemID: string) => {
    firestore()
      .collection('Items')
      .doc(itemID)
      .delete()
      .then(() => {
        Alert.alert('Item successfully deleted!', '');
      })
      .catch(e => console.log('Error deleting item data.', e));
  };

  return (
    <sc.RequestCard>
      <sc.DetailsWrapper>
        <sc.Picture source={require('../../assets/images/profile.jpg')} />
        <sc.TextWrapper>
          <sc.TextInfo>
            {request.senderID} would like to pick up your {request.itemName}
          </sc.TextInfo>
        </sc.TextWrapper>
      </sc.DetailsWrapper>
      <sc.ButtonsWrapper>
        <sc.ButtonView>
          <TouchableOpacity
            onPress={() => handleDelete(request.itemID, request.requestID)}>
            <sc.AcceptButton mode={'contained'}>
              <sc.ButtonText>Accept</sc.ButtonText>
            </sc.AcceptButton>
          </TouchableOpacity>
        </sc.ButtonView>
        <sc.ButtonView>
          <TouchableOpacity onPress={() => deleteRequest(request.requestID)}>
            <sc.DenyButton mode={'contained'}>
              <sc.ButtonText>Decline</sc.ButtonText>
            </sc.DenyButton>
          </TouchableOpacity>
        </sc.ButtonView>
      </sc.ButtonsWrapper>
    </sc.RequestCard>
  );
};
