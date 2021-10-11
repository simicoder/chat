import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen} from '../../screens/ChatScreen/ChatScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === 'Chats') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-person-circle'
              : 'ios-person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: {backgroundColor: '#242424'},
        tabBarStyle: {borderTopWidth: 0},
      })}>
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
