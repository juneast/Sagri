import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import UpperMenu from '../UpperMenu'
import FooterMenu from '../FooterMenu'
import { View, StyleSheet, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Post from '../Post'
import MakeBoard from '../MakeBoard'
import Action from '../Action'
import Search from '../Search'
import Chat from '../Chat'

const Stack = createStackNavigator();

class HomeScreen extends Component {

  render() {
    return (
      <Container style={styles.view}>
        <UpperMenu navigation={this.props.navigation} />
        <FooterMenu navigation={this.props.navigation} />
      </Container>

    );
  }
}

function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Post></Post></View>
  );
}
function MakeBoardScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MakeBoard navigation = {navigation} />
    </View>
  );
}


const MainNavigator = ()=> {
    return (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="글작성" component={MakeBoardScreen} options={{
            headerTitle: props => <Action />,
            headerTitleAlign: "center",
            headerTintColor: '#000',
            headerRight: props => (
              <Text style={{ marginRight: 20 }}>등록</Text>
            )
          }} />
          <Stack.Screen name="검색" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="채팅" component={Chat} options={{ headerShown: false }} />
        </Stack.Navigator>
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