import styled from 'styled-components';
import {Button, Card} from 'react-native-paper';
import {Text, View} from 'react-native';
import {MainButton} from '../MainButton/MainButton';

export const RequestCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  margin: ${props => props.theme.space[3]};
  padding: ${props => props.theme.space[3]};
`;

export const DetailsWrapper = styled(View)`
  align-items: center;
  flex-direction: row;
`;

export const PictureWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 0.3;
`;

export const TextWrapper = styled(View)`
  flex: 1;
`;

export const TextInfo = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;

export const Picture = styled(Card.Cover)`
  flex: 0.3;
  height: 90px;
  padding: ${props => props.theme.space[2]};
  margin-right: ${props => props.theme.space[2]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const ButtonsWrapper = styled(View)`
  flex-direction: row;
  margin-top: ${props => props.theme.space[2]};
`;

export const ButtonView = styled(View)`
  flex: 1;
`;

export const AcceptButton = styled(Button)`
  border-radius: 10px;
  background-color: ${props => props.theme.colors.ui.success};
  margin-left: ${props => props.theme.space[2]};
  margin-right: ${props => props.theme.space[1]};
`;

export const DenyButton = styled(Button)`
  border-radius: 10px;
  background-color: ${props => props.theme.colors.ui.error};
  margin-left: ${props => props.theme.space[1]};
  margin-right: ${props => props.theme.space[2]};
`;

export const ButtonText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.tertiary};
`;
