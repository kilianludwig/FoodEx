import styled from 'styled-components';
import {View} from 'react-native';

export const ItemScreen = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const RequestButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  padding-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[1]};
`;
