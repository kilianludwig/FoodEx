import styled from 'styled-components';
import {View} from 'react-native';

export const ProfileScreen = styled(View)`
  flex: 1;
  flex-direction: column;
  //position: relative;
`;

export const LogOutButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  padding-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[3]};
`;
