import React, { Component } from 'react';
import {View, Button, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Hoshi  } from 'react-native-textinput-effects';

export function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

export function isPassword(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

class SignUpScreen extends React.Component {
  state = {
    userid: '', password: '', password_chk: '', email: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { userid, password, password_chk, email } = this.state
    try {
      // here place your signup logic
      console.log('User Successfully Signed Up!: ', success)
    } catch (err) {
      console.log('Error Signing Up: ', err)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView} >
        <Hoshi 
            label={'아이디'}
            // this is used as active and passive border color
            borderColor={'#CCCCCC'}
            style={styles.inputText}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#999999' }}
            inputStyle={{ color: '#000000' }}
            autoCapitalize="none"
            onChangeText={text => this.setState({userid:text})}
        />
        </View>
        <View style={styles.inputView} >
        <Hoshi 
            label={'비밀번호'}
            secureTextEntry
            // this is used as active and passive border color
            borderColor={'#CCCCCC'}
            style={styles.inputText}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#999999' }}
            inputStyle={{ color: '#000000' }}
            autoCapitalize="none"
            onChangeText={text => this.setState({password:text})}
        />
        </View>
        <View style={styles.inputView} >
        <Hoshi 
            label={'비밀번호 확인'}
            secureTextEntry
            // this is used as active and passive border color
            borderColor={'#CCCCCC'}
            style={styles.inputText}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#999999' }}
            inputStyle={{ color: '#000000' }}
            autoCapitalize="none"
            onChangeText={text => this.setState({password_chk:text})}
        />
        </View>
        <View style={styles.inputView} >
        <Hoshi 
            label={'이메일'}
            // this is used as active and passive border color
            borderColor={'#CCCCCC'}
            style={styles.inputText}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#999999' }}
            inputStyle={{ color: '#000000' }}
            autoCapitalize="none"
            onChangeText={text => this.setState({email:text})}
        />
        </View>
 
        <TouchableOpacity
                        onPress={()=> this.props.navigation.goBack()}
                        style={styles.Btn}>
                        <Text style={styles.SignUpText}>회원가입</Text> 
        </TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderBottomColor: '#ededed',
    borderRadius:10,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  Btn:{
    width:"80%",
    backgroundColor:"#0178D4",
    borderRadius:10,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:35
  },
  SignUpText:{
    color:"white"
  }
})

export default SignUpScreen;