import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export const MyItemsScreen = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const RoundButtonTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
`;

export const ButtonContainer = styled(View)`
  padding: ${props => props.theme.space[4]};
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

export const RoundButton = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  border-radius: 60px;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
`;
