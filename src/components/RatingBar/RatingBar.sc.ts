import styled from 'styled-components';
import {View} from 'react-native';

export const RatingBar = styled(View)`
  flex-direction: row;
  padding: ${props => props.theme.space[2]};
`;
