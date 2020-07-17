import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import ForgetScreen from '../screens/ForgetScreen'
import SignUpScreen from '../screens/SignUpScreen'
import TimelineNavigator from './TimelineNavigator';
import EmailAuth from '../screens/EmailAuth'
const Stack = createStackNavigator();

const LoginNavigator = ()=> {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TimelineNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Forget" component={ForgetScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, animationEnabled:false }} />
          <Stack.Screen name="EmailAuth" component={EmailAuth} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
}

export default LoginNavigator;