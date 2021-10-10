import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput} from 'react-native';

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export const Input = ({text, setText}: Props) => {
  return (
    <TextInput
      value={text}
      onChangeText={setText}
      style={styles.textInput}
      placeholder="Enter message"
      placeholderTextColor="#595959"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '75%',
    height: 40,
    margin: 0,
    padding: 12,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 17,
    letterSpacing: 0,
    color: '#ffa600',
    fontWeight: '600',
    borderRadius: 500,
    alignItems: 'center',
    backgroundColor: '#282a2d',
  },
});
