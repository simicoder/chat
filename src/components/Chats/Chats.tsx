import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const Chats = ({chat}: any) => {
  const {owner} = chat;
  const currentUser = auth()?.currentUser?.uid;

  return owner === currentUser ? (
    <Sent chat={chat} />
  ) : (
    <Received chat={chat} />
  );
};

const Sent = ({chat}: any) => {
  const styles = StyleSheet.create({
    rowStyle: {
      margin: 0,
      height: 75,
      maxWidth: '100%',
      marginLeft: 'auto',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      padding: 8,
      fontSize: 18,
      maxWidth: '150%',
      letterSpacing: 0,
      fontWeight: '600',
      textAlign: 'right',
      color: '#b1b1b1',
    },
    touchable: {
      padding: 4,
      elevation: 6,
      height: 'auto',
      maxWidth: '120%',
      marginRight: 0,
      marginLeft: 'auto',
      borderRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#3a3a3a',
    },
  });

  const {id, imageUrl, text} = chat;

  const handleDelete = async () => {
    await firestore().collection('chats').doc(id).delete();
  };

  return (
    <View style={styles.rowStyle}>
      <TouchableOpacity
        key={id}
        onPress={handleDelete}
        style={styles.touchable}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
