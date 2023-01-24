import styled from 'styled-components';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export const ListElement = styled(TouchableOpacity)`
  width: 390px;
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const ItemTitle = styled(Text)`
  font-size: 25px;
  font-weight: 600;
  color: ${props => props.theme.colors.ui.primary};
`;

export const ItemInfo = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.colors.ui.primary};
`;

export const ImageView = styled(View)`
  flex: 0.4;
`;

export const TitleView = styled(View)`
  flex: 1;
  // align-items: center;
`;

export const InfoView = styled(View)`
  flex: 0.4;
  flex-direction: column;
`;

export const ItemImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin: 10px;
`;
