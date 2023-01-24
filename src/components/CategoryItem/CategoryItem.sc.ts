import styled from 'styled-components';
import {Image, Text, View} from 'react-native';
import {Card} from 'react-native-paper';

export const CategoryItem = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.space[3]};
  margin-top: ${props => props.theme.space[2]};
  margin-left: ${props => props.theme.space[2]};
  margin-right: ${props => props.theme.space[2]};
`;

export const CategoryTitle = styled(Text)`
  font-size: 25px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
`;

export const CategoryIcon = styled(Image)`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

export const CategoryContent = styled(View)`
  flex-direction: row;
  align-items: center;
`;
