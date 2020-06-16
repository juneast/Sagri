import React, {Component} from 'react';
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
const Stack = createStackNavigator();

class HomeScreen extends Component{
  handleDetails = ()=>{
  }
  render(){
    return (
      <Container style={styles.view}>
          <UpperMenu navigation={this.props.navigation}/>
          <FooterA />
      </Container>
  
    );
  }
}

function DetailsScreen({route}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Temp></Temp></View>
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
          <Stack.Screen name="Home" component={HomeScreen} options ={{headerShown : false}}/>
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}
const styles = StyleSheet.create({
  view: {
    marginTop:50
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

