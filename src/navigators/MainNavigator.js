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
import Search from '../Search'
import ChattingRoomList from '../ChatRoomList'
import Chat from '../Chat'

const Stack = createStackNavigator();

const MainNavigator = ()=> {
    return (
      <Root>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={UpperMenu} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={Post} options={{ 
            // headerTitle: props => <Text>디테일</Text>,
            // headerTintColor: '#000',
            // headerRight: props => (
            //   <Button title="수정" style={{ marginRight: 20 }} onPress={()=>console.log(props)}/>
              
            // )

          }} />
          <Stack.Screen name="글작성" component={MakeBoard} options={{ headerShown:false
            // headerTitle: props => <Action />,
            // headerTitleAlign: "center",
            // headerTintColor: '#000',
            // headerRight: props => (
            //   <Text style={{ marginRight: 20 }}>등록</Text>
            // )
          }} />
          <Stack.Screen name="검색" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="채팅" component={ChattingRoomList} options={{ headerShown: false }} />
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

export default MainNavigator;