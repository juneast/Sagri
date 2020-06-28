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
import axios from 'axios'
import JoinScreen from './src/Join'
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
function MakeBoardScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MakeBoard navigation = {navigation} />
    </View>
  );
}

const sendPost = async ()=>{
  try{
      const data = await axios({ 
          url: "http://54.180.167.12:5000/api/post",
          method:'get',
          headers : {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQzOWRkYTI5MWVmMTU3NzBkZWFkNDUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTkzMDUzMTgyLCJleHAiOjE1OTM2NTc5ODIsImlzcyI6IkxESiIsInN1YiI6InVzZXJJbmZvIn0.Ojtc_As3BA3HO1_cdKLTh7svEW9BntliR611pbdg7Uc',
          }
      })
  }catch(err){
      console.log(err);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      page: 1,
      data: []
    };
  }

  _getData = () => {
    const url = 'http://54.180.167.12:5000/api/post' + this.state.page;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.setState({ 
          data: this.state.data.concat(data), // 기존 data에 추가.
          page: this.state.page + 1
        })
      });
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

