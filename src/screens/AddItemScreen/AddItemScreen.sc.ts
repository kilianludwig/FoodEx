import styled from 'styled-components';
import {Image, View} from 'react-native';
import {Card, TextInput} from 'react-native-paper';

export const AddItemScreen = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled(TextInput)`
  background-color: ${props => props.theme.colors.bg.primary};
  width: 300px;
`;

export const ButtonContainer = styled(View)`
  width: 300px;
`;

export const UploadButtonContainer = styled(View)`
  flex: 1;
  flex-direction: column-reverse;
  padding-bottom: ${(props: {theme: {space: any[]}}) => props.theme.space[3]};
  width: 300px;
`;

export const PreviewContainer = styled(View)`
  width: 440px;
  margin-bottom: 20px;
`;

export const ItemPreview = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.space[0]};
  margin-top: ${props => props.theme.space[3]};
  margin-left: ${props => props.theme.space[3]};
  margin-right: ${props => props.theme.space[3]};
`;

export const ItemPreviewCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[2]};
  background-color: ${props => props.theme.colors.bg.primary};
  height: 320px;
`;
