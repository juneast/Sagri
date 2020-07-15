import React, { Component } from 'react';
import UpperMenu from '../UpperMenu'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const TimelineStack = ()=> {
    return (
        <Stack.Navigator initialRouteName="Timeline">
          <Stack.Screen name="Timeline" component={UpperMenu} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default TimelineStack;