import * as React from 'react';
import * as sc from './/RequestCard.sc';
import {MainButton} from '../MainButton/MainButton';
import {View} from 'react-native';

interface RequestProps {
  sender_id?: string;
  receiver_id?: string;
  item_id?: string;
  // TODO Fetch names from IDs
  sender_name: string;
  item_name: string;
}

export const RequestCard: React.FunctionComponent<RequestProps> = ({
  sender_id,
  receiver_id,
  item_id,
  sender_name,
  item_name,
}) => {
  return (
    <sc.RequestCard>
      <sc.DetailsWrapper>
        <sc.Picture source={require('../../assets/images/profile.jpg')} />
        <sc.TextWrapper>
          <sc.TextInfo>
            {sender_name} would like to pick up your {item_name}
          </sc.TextInfo>
        </sc.TextWrapper>
      </sc.DetailsWrapper>
      <sc.ButtonsWrapper>
        <sc.ButtonView>
          <sc.AcceptButton mode={'contained'}>
            <sc.ButtonText>Accept</sc.ButtonText>
          </sc.AcceptButton>
        </sc.ButtonView>
        <sc.ButtonView>
          <sc.DenyButton mode={'contained'}>
            <sc.ButtonText>Deny</sc.ButtonText>
          </sc.DenyButton>
        </sc.ButtonView>
      </sc.ButtonsWrapper>
    </sc.RequestCard>
  );
};
