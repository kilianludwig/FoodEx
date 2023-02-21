import * as React from 'react';
import * as sc from './/RequestCard.sc';
import {requestItem} from '../../screens/RequestsScreen/RequestsScreen';

interface RequestProps {
  request: requestItem;
}

export const RequestCard: React.FunctionComponent<RequestProps> = ({
  request,
}) => {
  return (
    <sc.RequestCard>
      <sc.DetailsWrapper>
        <sc.Picture source={require('../../assets/images/profile.jpg')} />
        <sc.TextWrapper>
          <sc.TextInfo>
            {request.senderID} would like to pick up your {request.itemID}
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
