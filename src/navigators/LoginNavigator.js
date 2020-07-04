import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import ForgetScreen from '../screens/ForgetScreen'
import SignUpScreen from '../screens/SignUpScreen'
import MainNavigator from './MainNavigator'

const Stack = createStackNavigator();

const LoginNavigator = ()=> {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={MainNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Forget" component={ForgetScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
}

export default LoginNavigator;