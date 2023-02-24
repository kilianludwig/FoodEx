import * as React from 'react';
import * as sc from './/UserCard.sc';
// import {RatingBar} from '../RatingBar/RatingBar';
import {useContext} from 'react';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {FadeInView} from '../../utils/Animations/fade.animation';
import firestore from '@react-native-firebase/firestore';

export type userItem = {
  userID: string;
  fullName: string;
  email: string;
  address: string;
  number: string;
  picture: string;
};

interface UserProps {
  user: userItem;
}

export const UserCard: React.FunctionComponent<UserProps> = ({user}) => {
  return (
    <FadeInView>
      <sc.ProfileCard elevation={2}>
        <sc.UserPicture key={user.userID} source={{uri: user.picture}} />
        <sc.UserInfoWrapper>
          <sc.UsernameWrapper>
            <sc.Name>{user.fullName}</sc.Name>
          </sc.UsernameWrapper>
          <sc.UserDetailsWrapper>
            {/*<RatingBar rating={USER_DATA[0].rating} />*/}
            <sc.Location>{user.address}</sc.Location>
            <sc.Phone>{user.email}</sc.Phone>
            <sc.Phone>{user.number}</sc.Phone>
          </sc.UserDetailsWrapper>
        </sc.UserInfoWrapper>
      </sc.ProfileCard>
    </FadeInView>
  );
};
