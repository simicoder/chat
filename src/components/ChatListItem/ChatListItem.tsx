import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const ChatListItem = ({chat}: any) => {
  const styles = StyleSheet.create({
    rowStyle: {
      margin: 0,
      height: 75,
      maxWidth: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      padding: 8,
      fontSize: 18,
      maxWidth: '150%',
      letterSpacing: 0,
      fontWeight: '600',
      textAlign: 'left',
      color: 'white',
    },
    touchable: {
      padding: 9,
      height: 'auto',
      width: '98%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderColor: '#242424',
      borderWidth: 0,
      borderBottomWidth: 0.7,
    },
  });

  const {id, imageUrl, text} = chat;

  return (
    <View style={styles.rowStyle}>
      <TouchableOpacity key={id} style={styles.touchable}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
