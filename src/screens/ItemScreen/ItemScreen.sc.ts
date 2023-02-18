import styled from 'styled-components';
import {View} from 'react-native';
import {MainButton} from '../../components/MainButton/MainButton.sc';
import {Text} from 'react-native-paper';

export const ItemScreen = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  padding-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[1]};
`;

export const DeleteButton = styled(MainButton)`
  background-color: ${props => props.theme.colors.bg.negative};
`;

export const DeleteButtonTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;
