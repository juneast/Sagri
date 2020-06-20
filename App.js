import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import UpperMenu from './src/UpperMenu'
import FooterA from './src/FooterA'
import { View, StyleSheet, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Temp from './src/Temp'
import MakeBoard from './src/MakeBoard'
import Action from './src/Action'
import Search from './src/Search'
import Chat from './src/Chat'
import Example from './src/Example'
const Stack = createStackNavigator();

class HomeScreen extends Component {
  handleDetails = () => {
  }
  render() {
    return (
      <Container style={styles.view}>
        <UpperMenu navigation={this.props.navigation} />
        <FooterA navigation={this.props.navigation} />
      </Container>

    );
  }
}

function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Temp></Temp></View>
  );
}
function MakeBoardScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MakeBoard />
    </View>
  );
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ gestureDirection:"horizontal"}} />
          <Stack.Screen name="글작성" component={MakeBoardScreen} options={{
            headerTitle: props => <Action />,
            headerTitleAlign: "center",
            headerTintColor: '#000', 
            headerRight: props => (
              <Text style={{ marginRight: 20 }}>등록</Text>
            )
          }} />
          <Stack.Screen name="검색" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="채팅" component={Example} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
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

