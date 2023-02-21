import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import React, {useRef} from 'react';
import * as sc from './CameraScreen.sc';

export const CameraScreen = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.back;

  const cameraRef = useRef<Camera>(null);

  React.useEffect(() => {
    requestCameraPermission();
  });

  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const takePicture = async () => {
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      }

      // console.log('Taking Picture...');

      const photo = await cameraRef.current.takePhoto({});

      // console.log(photo);

      navigation.navigate('AddItemScreen', {data: photo});
    } catch (error) {
      console.log(error);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>Device is null</Text>
      </View>
    );
  }

  return (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <sc.ButtonContainer>
        <TouchableOpacity onPress={takePicture}>
          <sc.CameraButton>
            <sc.Title>O</sc.Title>
          </sc.CameraButton>
        </TouchableOpacity>
      </sc.ButtonContainer>
    </>
  );
};
//
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import React, {useState} from 'react';
// import {Text, TouchableOpacity, View} from 'react-native';
//
// //https://react-native-async-storage.github.io/async-storage/docs/usage
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// export const CameraScreen = () => {
//   const devices = useCameraDevices();
//   const device = devices.back;
//
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//
//   const requestCameraPermission = async () => {
//     try {
//       //const test = await Camera.getAvailableCameraDevices();
//       // console.log('Cam: ', {test});
//
//       const granted = await Camera.requestCameraPermission();
//       // const granted = await Camera.getCameraPermissionStatus();
//       if (granted) {
//         setHasPermission(true);
//         setIsCameraReady(true);
//         console.log('You can use the camera');
//       } else {
//         console.log('Camera permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//       console.log('This error was caught after requesting Camera permission');
//     }
//   };
//
//   if (device == null)
//     return (
//       <View>
//         <Text>Device is null</Text>
//       </View>
//     );
//
//   return (
//     <View>
//       {hasPermission ? (
//         isCameraReady ? (
//           <Camera device={device!} isActive={true} />
//         ) : (
//           <Text>Loading Camera</Text>
//         )
//       ) : (
//         <TouchableOpacity onPress={requestCameraPermission}>
//           <Text>Request Camera Permission</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };
