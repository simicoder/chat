import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button, ThemeProvider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/RootStack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<RootStackParamList>;

export const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }

        Alert.alert('Error', error);
      });
  };

  const theme = {
    Button: {
      containerStyle: {
        marginTop: 10,
      },
      buttonStyle: {
        backgroundColor: '#a0a0a0',
      },
      titleStyle: {
        color: 'black',
      },
    },
    Input: {
      color: 'white',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Input
          placeholder="Enter your email"
          label="Email"
          leftIcon={{type: 'material', name: 'email', color: 'white'}}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Enter your password"
          label="Password"
          leftIcon={{type: 'material', name: 'lock', color: 'white'}}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button title="sign in" onPress={login} />
        <Button
          title="register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 80,
  },
});
