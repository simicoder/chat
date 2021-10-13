import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {SignOutButton} from '../../components/SignOutButton/SignOutButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/RootStack';

type Props = NativeStackScreenProps<RootStackParamList>;

export const ProfileScreen = ({navigation}: Props) => {
  const handleSignOut = async () => {
    await auth().signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{auth()?.currentUser?.displayName}</Text>
      <SignOutButton handleClick={handleSignOut} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  button: {
    width: 370,
    marginTop: 10,
  },
  text: {
    color: 'white',
  },
});
