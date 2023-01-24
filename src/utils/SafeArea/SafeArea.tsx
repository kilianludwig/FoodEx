import styled from 'styled-components';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

// export default function App() {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//         backgroundColor: colors.white,
//       }}>
//       <ListScreen />
//     </SafeAreaView>
//   );
// }
