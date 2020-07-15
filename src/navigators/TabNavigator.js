import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base'
import Post from '../Post'
import MakeBoard from '../MakeBoard'
import UpdateBoard from '../screens/UpdateBoard'
import Action from '../Action'
import Search from '../Search'
import ChattingRoomList from '../ChatRoomList'
import Chat from '../Chat'
import UpperMenu from '../UpperMenu'
import TimelineStack from './TimelineStack';
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Timeline') {
            iconName = "apps"
          } else if (route.name === 'Settings') {
            iconName = "person"
          } else if (route.name === 'Search') {
            iconName = "search"
          } else if (route.name === 'ChatRoom') {
            iconName = "chatboxes"
          } else if (route.name === '글작성') {
            iconName = "create"
          }
          // You can return any component that you like here!
          return <Icon name={iconName} style={{color}}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel : false,
        keyboardHidesTabBar : true,
      }}
    >
        <Tab.Screen name="Timeline" component={TimelineStack} />
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="ChatRoom" component={ChattingRoomList} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="글작성" component={MakeBoard} />
      </Tab.Navigator>
  );
}