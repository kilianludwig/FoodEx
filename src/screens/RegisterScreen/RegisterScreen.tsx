import React, {useState, useContext} from 'react';
import * as sc from '../AccountScreen/AccountScreen.sc';
import {Spacer} from '../../utils/Spacer/Spacer';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {Text} from 'react-native';
import {MainButton} from '../../components/MainButton/MainButton';
import {ActivityIndicator} from 'react-native-paper';

export const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const [repeatedPassword, setRepeatedPassword] = useState('');
  const {onRegister, isLoading, error} = useContext(AuthenticationContext);
  return (
    <sc.AccountBackground>
      <sc.AccountBackgroundOpacity />
      <sc.SecondLogo
        source={require('../../assets/images/logo.png')}
        resizeMode={'contain'}
      />
      <sc.AccountContainer>
        <sc.InputField
          mode="outlined"
          activeOutlineColor="black"
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={e => setEmail(e)}
        />
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={p => setPassword(p)}
          />
        </Spacer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={rp => setRepeatedPassword(rp)}
          />
        </Spacer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Name"
            value={name}
            textContentType="givenName"
            autoCapitalize="none"
            onChangeText={n => setName(n)}
          />
        </Spacer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Phone number"
            value={number}
            keyboardType="phone-pad"
            autoCapitalize="none"
            onChangeText={num => setNumber(num)}
          />
        </Spacer>
        <Spacer size="medium">
          <sc.InputField
            mode="outlined"
            activeOutlineColor="black"
            label="Address"
            value={address}
            autoCapitalize="none"
            onChangeText={a => setAddress(a)}
          />
        </Spacer>
        {error && (
          <sc.ErrorContainer>
            <Text>{error}</Text>
          </sc.ErrorContainer>
        )}
        <Spacer size="medium">
          <sc.ButtonContainer>
            {!isLoading ? (
              <MainButton
                title="Register"
                onPress={() =>
                  onRegister(
                    email,
                    password,
                    repeatedPassword,
                    name,
                    number,
                    address,
                  )
                }
              />
            ) : (
              <ActivityIndicator animating={true} />
            )}
          </sc.ButtonContainer>
        </Spacer>
      </sc.AccountContainer>
      <Spacer size="medium">
        <sc.ButtonContainer>
          <MainButton title="Back" onPress={() => navigation.goBack()} />
        </sc.ButtonContainer>
      </Spacer>
    </sc.AccountBackground>
  );
};
