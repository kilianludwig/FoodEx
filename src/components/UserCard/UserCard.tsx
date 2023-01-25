import * as React from 'react';
import * as sc from './/UserCard.sc';
// import {RatingBar} from '../RatingBar/RatingBar';
import {USER_DATA} from '../../assets/database/user_data';
import {useContext} from 'react';
import {AuthenticationContext} from '../../services/authentication/authentication.context';

interface UserProps {
  id?: string;
  username?: string;
  name?: string;
  location?: string;
  picture?: string;
}

export const UserCard: React.FunctionComponent<UserProps> = ({
  id,
  username,
  name,
  location,
  picture, // TODO make flexible (Next JS)
}) => {
  // const {user} = useContext(AuthenticationContext);

  return (
    <sc.ProfileCard elevation={2}>
      <sc.UserPicture
        key={id}
        source={require('../../assets/images/profile.jpg')}
      />
      <sc.UserInfoWrapper>
        <sc.UsernameWrapper>
          <sc.Name>{USER_DATA[0].name}</sc.Name>
        </sc.UsernameWrapper>
        <sc.UserDetailsWrapper>
          {/*<RatingBar rating={USER_DATA[0].rating} />*/}
          <sc.Location>{USER_DATA[0].location}</sc.Location>

          <sc.Phone>{USER_DATA[0].phone}</sc.Phone>
        </sc.UserDetailsWrapper>
      </sc.UserInfoWrapper>
    </sc.ProfileCard>
  );
};
