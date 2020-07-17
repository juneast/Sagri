import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import { Post , Chat, UpdateBoard} from '../screens/index'

const Stack = createStackNavigator();

const TimelineNavigator = () => {
  return (
    <Root>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Post} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="글수정" component={UpdateBoard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </Root>
  );
}

export default TimelineNavigator;