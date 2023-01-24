import styled from 'styled-components/native';
import {View, Image} from 'react-native';
import {TextInput} from 'react-native-paper';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../assets/images/account_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountBackgroundOpacity = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props: {theme: {space: any[]}}) => props.theme.space[3]};
  margin-top: ${(props: {theme: {space: any[]}}) => props.theme.space[4]};
  margin-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[4]};
  border-radius: 16px;
  align-items: center;
`;

export const InputField = styled(TextInput)`
  background-color: ${(props: {theme: {colors: {bg: {primary: any}}}}) =>
    props.theme.colors.bg.primary};
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props: {theme: {space: any[]}}) => props.theme.space[2]};
  margin-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[2]};
`;

export const ButtonContainer = styled(View)`
  width: 250px;
`;

export const MainLogo = styled(Image)`
  height: 80px;
`;

export const SecondLogo = styled(Image)`
  height: 60px;
`;
