import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{auth()?.currentUser?.displayName}</Text>
    </View>
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
