import styled from 'styled-components';
import {Card, Text} from 'react-native-paper';

export const MainButton = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.space[3]};
  margin-top: ${props => props.theme.space[2]};
  margin-bottom: ${props => props.theme.space[2]};
  margin-left: ${props => props.theme.space[3]};
  margin-right: ${props => props.theme.space[3]};
  align-items: center;
`;

export const MainButtonTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;
