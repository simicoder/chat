import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, ThemeProvider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/RootStack';

type Props = NativeStackScreenProps<RootStackParamList>;

export const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        let user: any = userCredential.user;

        user
          .updateProfile({
            displayName: name,
            photoUrl: avatar
              ? avatar
              : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
          })
          .catch((error: Error) => {
            console.log(error.message);
            // alert(error.message);
          });

        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
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
          placeholder="Enter your name"
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Enter your email"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Enter your password"
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Input
          placeholder="Enter your image url"
          label="Profile Picture"
          value={avatar}
          onChangeText={text => setAvatar(text)}
        />
        <Button title="register" onPress={register} style={styles.button} />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});
