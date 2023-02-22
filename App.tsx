import React from 'react';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/infrastructure/theme';
import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat';
import {AuthenticationContextProvider} from './src/services/authentication/authentication.context';
import {Navigation} from './src/infrastructure/navigation';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMcinCrj5Ni0bisbH5OsnkTUonNmrvmHk',
  authDomain: 'foodex-11922175.firebaseapp.com',
  projectId: 'foodex-11922175',
  storageBucket: 'foodex-11922175.appspot.com',
  messagingSenderId: '950757213853',
  appId: '1:950757213853:web:5785e8f199718050ddb674',
};

if (!firebase.apps.length) {
  const app = initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
}
