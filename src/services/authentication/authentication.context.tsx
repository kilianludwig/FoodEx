import React, {useState, createContext, useRef} from 'react';
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  updateProfile,
} from 'firebase/auth';

import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../App';

// import doc from '@react-native-firebase/firestore';
// import setDoc from '@react-native-firebase/firestore';
// import db from '@react-native-firebase/firestore';

import {loginRequest} from './authentication.service';

// https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue
export const AuthenticationContext = createContext(null);

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, usr => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then(u => {
        setUser(u);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string,
    name: string,
    phoneNumber: string,
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      setIsLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const {user} = userCredential;
        // Update the user's display name
        if (user) {
          updateProfile(user, {displayName: name})
            .then(() => {
              // Update the user's phone number
              const userRef = doc(db, 'Users', user.uid);
              setDoc(userRef, {phoneNumber: phoneNumber}, {merge: true})
                .then(() => {
                  setUser(user);
                  setIsLoading(false);
                })
                .catch(error => {
                  setIsLoading(false);
                  setError(error.message);
                });
            })
            .catch(error => {
              setIsLoading(false);
              setError(error.message);
            });
        } else {
          setIsLoading(false);
          setError('Error: User not found');
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
