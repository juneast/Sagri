import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Timeline } from '../screens/index'

const Stack = createStackNavigator();

const TimelineStack = () => {
    return (
        <Stack.Navigator initialRouteName="Timeline">
            <Stack.Screen name="Timeline" component={Timeline} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default TimelineStack;