import styled from 'styled-components';
import {Text, View} from 'react-native';
import {Card} from 'react-native-paper';

export const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  align-items: center;
  padding: ${(props: {theme: {space: any[]}}) => props.theme.space[4]};
`;

export const CameraButton = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  border-radius: 60px;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
`;
