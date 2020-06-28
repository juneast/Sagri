import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

export default class LoginScreen extends Component {
    state = {
        email: "",
        password  : "",
    };

    changeEmail = (text) => {
        this.setState({ email : text });
    };
    
    changePassword = (text) => {
        this.setState({ password : text });
    };
     
    render(){
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Join us!!</Text>

              <TextInput
                placeholder='email'
                style={styles.textinput}
                onChangeText={this.changeEmail}
                value={this.state.email}
                />
                <TextInput
                secureTextEntry={true}
                placeholder='password'
                style={styles.textinput}
                onChangeText={this.changePassword}
                value={this.state.password}
                />
              <Button title="Login!" onPress={() => alert(`${this.state.email}, ${this.state.password}`)}/>
              <Button title="아이디 찾기"/>
              <Button title="비밀번호 찾기"/>

            </View>
          );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  title: {
      margin: 30,
      fontSize: 30,
      fontSize: 20,
      fontWeight: 'bold',
  },

  textinput:{
    width: 250,
    marginBottom: 10,
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1
}
});