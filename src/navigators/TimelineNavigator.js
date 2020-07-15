import React, { Component } from 'react';
import { Container, Text, Root } from 'native-base';
import UpperMenu from '../UpperMenu'
import { View, StyleSheet, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Post from '../Post'
import MakeBoard from '../MakeBoard'
import UpdateBoard from '../screens/UpdateBoard'
import Action from '../Action'
import ChattingRoomList from '../ChatRoomList'
import Chat from '../Chat'
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator();

const TimelineNavigator = ()=> {
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

const styles = StyleSheet.create({
  view: {
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ma: {
    marginTop: 50,
  }
});

export default TimelineNavigator;