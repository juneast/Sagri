import React, { Component } from 'react';
import Search from '../screens/Search'
import SearchResult from '../screens/SearchResult'
import { Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const SearchStack = ()=> {
    return (
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false, animationEnabled:false }} />
          <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false, animationEnabled:false }} />
        </Stack.Navigator>
    );
}

export default SearchStack;