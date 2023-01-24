import styled from 'styled-components';
import {Card} from 'react-native-paper';
import {Text, View} from 'react-native';

export const ProfileCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  margin: ${props => props.theme.space[3]};
`;

export const UserInfoWrapper = styled(View)`
  flex-direction: column;
  padding: ${props => props.theme.space[2]};
`;

export const UserDetailsWrapper = styled(View)`
  align-items: center;
  flex-direction: column;
`;

export const UsernameWrapper = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const Name = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
  margin-bottom: 5px;
`;

export const Username = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;

export const Location = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;

export const UserPicture = styled(Card.Cover)`
  padding: ${props => props.theme.space[2]};
  background-color: ${props => props.theme.colors.bg.primary};
`;
