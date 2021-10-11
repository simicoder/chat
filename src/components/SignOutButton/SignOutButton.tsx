import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export const SignOutButton = ({handleClick}: any) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <Text style={styles.text}>Sign out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
