import styled from 'styled-components';
import {View} from 'react-native';
import {RoundedButton} from '../../components/RoundedButton/RoundedButton';

export const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  align-items: center;
  padding: ${(props: {theme: {space: any[]}}) => props.theme.space[4]}; ;
`;

export const CameraButton = styled(RoundedButton)``;
