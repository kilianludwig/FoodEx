import * as sc from './/RequestsScreen.sc';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {RequestCard} from '../../components/RequestCard/RequestCard';
import {FlatList, RefreshControl} from 'react-native';
import {REQUEST_DATA} from '../../assets/database/request_data';
import firestore from '@react-native-firebase/firestore';
import {ListItem} from '../../components/ListItem/ListItem';
import {AuthenticationContext} from '../../services/authentication/authentication.context';

export type requestItem = {
  requestID: string;
  senderID: string;
  receiverID: string;
  itemID: string;
  requestTime: string;
};

export const RequestsScreen = ({navigation}) => {
  const authContext = useContext(AuthenticationContext);
  const currUserId = authContext.user ? authContext.user.uid : null;
  const [requests, setRequests] = useState<requestItem[] | undefined>(
    undefined,
  );

  const fetchRequests = async (userId: string) => {
    try {
      const requests: requestItem[] = [];

      await firestore()
        .collection('Requests')
        .orderBy('requestTime', 'desc')
        .where('receiverID', '==', userId)
        .get()
        .then(QuerySnapshot => {
          // console.log(QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {senderID, receiverID, itemID, requestTime} = doc.data();
            requests.push({
              requestID: doc.id,
              senderID: senderID,
              receiverID: receiverID,
              itemID: itemID,
              requestTime: requestTime,
            });
          });
        });
      setRequests(requests);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRequests(currUserId);
  }, []);

  // Pull-down-to-refresh functionality
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = useCallback(() => {
    setRefreshing(true);
    fetchRequests(currUserId);
    console.log(requests);
    setRefreshing(false);
  }, []);

  return (
    <sc.RequestsScreen>
      <FlatList
        data={requests}
        // TODO get requestID here
        keyExtractor={request => request.requestID}
        renderItem={({item}) => <RequestCard request={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      />
    </sc.RequestsScreen>
  );
};
