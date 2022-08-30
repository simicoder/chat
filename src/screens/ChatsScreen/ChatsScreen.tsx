import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native';
import {Input} from '../../components/Input/Input';
import {SendButton} from '../../components/SendButton/SendButton';
import {ChatListItem} from '../../components/ChatListItem/ChatListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/RootStack';

type Props = NativeStackScreenProps<RootStackParamList>;

export const ChatsScreen = ({navigation}: Props) => {
  const [text, setText] = useState('');
  const [chats, setChats] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const timestamp = firestore.FieldValue.serverTimestamp();
  const {uid, photoURL} = auth().currentUser as FirebaseAuthTypes.User;

  const sendMessage = async (e: React.SyntheticEvent) => {
    if (text.length > 1 && text.length < 40) {
      try {
        e.preventDefault();
        setLoading(true);

        await firestore()
          .collection('chats')
          .doc()
          .set({
            owner: uid,
            imageUrl: photoURL,
            text: text,
            createdAt: timestamp,
          })
          .then(() => {
            setText('');
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Error', err);
          });
      } catch (err) {
        setLoading(false);
        Alert.alert('Error', err as string);
      }
    } else {
      setLoading(false);
      Alert.alert('Chat not sent', 'Must be between 1 and 40 characters');
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .where('person1', '==', uid)
      .where('person2', '==', uid)
      .limitToLast(15)
      .onSnapshot(querySnapshot => {
        const chatsArr: any = [];
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          if (chatsArr) {
            chatsArr.push({id, ...data});
          }
        });
        setChats(chatsArr);
        setLoading(false);
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, [uid]);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <Input text={text} setText={setText} placeholder="Search" />
          </View>
        </View>
        <View style={styles.chatStyle}>
          {chats && (
            <FlatList
              data={chats}
              renderItem={({item}) => (
                <ChatListItem key={item.id} chat={item} />
              )}
            />
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  chatStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    margin: 0,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    paddingBottom: '15%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  inputContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    backgroundColor: '#151718',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e2123',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
    marginRight: 'auto',
    marginLeft: 8,
    padding: 4,
  },
  topContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    margin: 0,
    elevation: 6,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
