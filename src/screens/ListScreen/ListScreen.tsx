import * as sc from './ListScreen.sc';
import {
  FlatList,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainButton} from '../../components/MainButton/MainButton';
import {ListItem} from '../../components/ListItem/ListItem';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

export type listItem = {
  itemID: string;
  userID: string;
  image: string;
  title: string;
  expiration: string;
  location?: string;
  currDistance: string;
};

export const ListScreen = ({navigation}) => {
  // hold all item data
  const [items, setItems] = useState<listItem[] | undefined>(undefined);

  const [currLatitude, setCurrLatitude] = useState('48');
  const [currLongitude, setCurrLongitude] = useState('14');

  useEffect(() => {
    const requestLocationPermission = async () => {
      getOneTimeLocation();
    };

    requestLocationPermission();
    return () => {};
  });

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currLongitude = JSON.stringify(
          Math.round(position.coords.longitude * 100) / 100,
        );
        const currLatitude = JSON.stringify(
          Math.round(position.coords.latitude * 100) / 100,
        );

        setCurrLongitude(currLongitude);
        setCurrLatitude(currLatitude);
      },
      error => {
        console.log(error);
      },
    );
    return;
  };

  function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371.0; // radius of Earth in km

    const lat1_rad = radians(lat1);
    const lon1_rad = radians(lon1);
    const lat2_rad = radians(lat2);
    const lon2_rad = radians(lon2);

    const dlon = lon2_rad - lon1_rad;
    const dlat = lat2_rad - lat1_rad;

    const a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.pow(Math.sin(dlon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    console.log(lat1);
    console.log(lon1);
    console.log(lat2);
    console.log(lon2);

    console.log('distance');
    console.log(distance);
    return distance;
  }

  function radians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  const fetchItems = async () => {
    try {
      const list: listItem[] = [];

      await firestore()
        .collection('Items')
        .orderBy('postTime', 'desc')
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(doc => {
            const {userID, image, title, expiration, latitude, longitude} =
              doc.data();
            list.push({
              itemID: doc.id,
              userID: userID,
              image: image,
              title: title,
              expiration: expiration,
              currDistance:
                Math.trunc(
                  distance(
                    parseInt(currLatitude),
                    parseInt(currLongitude),
                    parseInt(latitude),
                    parseInt(longitude),
                  ),
                ).toString() + ' m',
            });
          });
        });
      setItems(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Pull-down-to-refresh functionality
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = useCallback(() => {
    setRefreshing(true);
    getOneTimeLocation();
    fetchItems();
    // console.log(items);
    setRefreshing(false);
  }, []);

  return (
    <sc.ListScreen>
      {/*<MainButton*/}
      {/*  title={'Search'}*/}
      {/*  onPress={() => navigation.navigate('SearchScreen')}*/}
      {/*/>*/}
      <FlatList
        data={items}
        keyExtractor={item => item.itemID}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onPress={() => navigation.navigate('ItemScreen', {data: item})}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      />
      <sc.ButtonContainer>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <sc.RoundButton elevation={1}>
            <sc.RoundButtonTitle>Profile</sc.RoundButtonTitle>
          </sc.RoundButton>
        </TouchableOpacity>
      </sc.ButtonContainer>
    </sc.ListScreen>
  );
};
