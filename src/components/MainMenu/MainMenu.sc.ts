import styled from 'styled-components';
import {View} from 'react-native';

export const MainMenu = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: ${props => props.theme.space[3]};
`;
