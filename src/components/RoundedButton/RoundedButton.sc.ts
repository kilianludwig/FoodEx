import styled from 'styled-components';
import {Text, TouchableOpacity} from 'react-native';

export const RoundedButton = styled(TouchableOpacity)`
  border-radius: 40px;
  border-width: 2px;
  width: 80px;
  height: 80px;
  margin-top: ${props => props.theme.space[2]};
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.ui.tertiary};
`;

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
`;
