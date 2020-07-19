import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import {MakeBoard, SelectPhoto} from '../screens/index'
import {Root} from 'native-base'
const Stack = createStackNavigator();

const MakeBoardStack = () => {
    return (
        <Root>
        <Stack.Navigator initialRouteName="MakeBoard">
            <Stack.Screen name="SelectPhoto" component={SelectPhoto} 
                options={{ headerShown: false }}
            />
            <Stack.Screen name="MakeBoard" component={MakeBoard} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        </Root>
    );
}

export default MakeBoardStack;