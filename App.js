import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import UpperMenu from './UpperMenu'
import FooterA from './FooterA'
import {View,StyleSheet} from 'react-native'
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
      <Container style={styles.view}>
          <UpperMenu />
          <FooterA/>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ma : {
    marginTop:50,
  }
});
