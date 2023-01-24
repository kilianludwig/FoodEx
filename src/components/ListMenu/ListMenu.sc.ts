import styled from 'styled-components';
import {View} from 'react-native';

export const ListMenu = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${props => props.theme.space[3]};
`;
