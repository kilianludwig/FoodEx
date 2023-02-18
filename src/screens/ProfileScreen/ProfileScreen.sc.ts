import styled from 'styled-components';
import {View} from 'react-native';
import {
  MainButton,
  MainButtonTitle,
} from '../../components/MainButton/MainButton.sc';
import {Text} from 'react-native-paper';

export const ProfileScreen = styled(View)`
  flex: 1;
  flex-direction: column;
  //position: relative;
`;

export const LogOutButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  padding-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[3]};
`;

export const LogOutButton = styled(MainButton)`
  background-color: ${props => props.theme.colors.bg.negative};
`;

export const LogOutButtonTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;
