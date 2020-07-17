import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base'
import SearchStack from '../navigators/SearchStack'
import TimelineStack from './TimelineStack';
import { MakeBoard, ChatRoomList, Settings } from '../screens/index'
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '타임라인') {
            iconName = "apps"
          } else if (route.name === '내정보') {
            iconName = "person"
          } else if (route.name === '검색') {
            iconName = "search"
          } else if (route.name === '대화') {
            iconName = "chatboxes"
          } else if (route.name === '글작성') {
            iconName = "create"
          }
          // You can return any component that you like here!
          return <Icon name={iconName} style={{color}}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'skyblue',
        inactiveTintColor: 'gray',
        //showLabel : false,
        keyboardHidesTabBar : true,
      }}
    >
        <Tab.Screen name="타임라인" component={TimelineStack} />
        <Tab.Screen name="검색" component={SearchStack}/>
        <Tab.Screen name="대화" component={ChatRoomList} />
        <Tab.Screen name="내정보" component={Settings} />
        <Tab.Screen name="글작성" component={MakeBoard} />
      </Tab.Navigator>
  );
}