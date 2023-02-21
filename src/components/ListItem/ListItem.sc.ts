import {Text, View} from 'react-native';
import styled from 'styled-components';
import {Card} from 'react-native-paper';

export const ItemCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.space[0]};
  margin-top: ${props => props.theme.space[3]};
  margin-left: ${props => props.theme.space[3]};
  margin-right: ${props => props.theme.space[3]};
`;

export const ItemCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[2]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const ItemCardInfoWrapper = styled(View)`
  padding: ${props => props.theme.space[3]};
  flex-direction: row;
  align-items: center;
`;

export const ItemCardTitleWrapper = styled(View)`
  flex: 1;
`;

export const ItemCardTitle = styled(Text)`
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
  margin-left: ${props => props.theme.space[2]};
`;

export const ItemCardDetailsWrapper = styled(View)`
  flex-direction: column;
`;

export const ItemCardDetails = styled(Text)`
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
  margin-right: ${props => props.theme.space[1]};
  margin-bottom: ${props => props.theme.space[1]};
`;
