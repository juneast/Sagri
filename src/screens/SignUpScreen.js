import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Hoshi } from 'react-native-textinput-effects';
import { Button, Icon } from 'native-base'
import axios from 'axios';
import EmailAuth from '../components/EmailAuth'

function isEmail(asValue) {
  var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function isPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

class SignUpScreen extends React.Component {
  state = {
    userId: '', password: '', password_chk: '', toggleAuth: false, emailAuth: false
  }

  signUp = async () => {
    const { userId, password, password_chk } = this.state
    try {
      // here place your signup logic
      console.log('User Successfully Signed Up!: ', success)
    } catch (err) {
      console.log('Error Signing Up: ', err)
    }
  }

  handleRegister = async () => {
    const { userId, password, password_chk, emailAuth } = this.state;
    if (userId === '') {
      return alert("아이디를 입력해주세요")
    } else if (!isPassword(password)) {
      return alert("비밀번호는 8 ~ 10자 영문, 숫자 조합이어야 합니다.")
    } else if (password !== password_chk) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.")
    } else if (!emailAuth){
      return alert("이메일을 인증해주세요")
    }
    try {
      const response = await axios({
        url: global.API_URI + "/api/user/register",
        method: 'post',
        data: {
          userId,
          password
        }
      })
      if (response.status === 200) {
        alert("회원가입에 성공했습니다.")
        this.props.navigation.goBack(null);
      }
    } catch (err) {
      if (err.response.status === 409) {
        alert("동일한 아이디가 존재합니다")
      } else {
        alert("서버 연결 오류!")
      }
      console.log(err);
    }
  }
  handleEmailAuth = () => {
    this.setState({ emailAuth: true });
    this.setState({ toggleAuth:false })
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
            onChangeText={text => this.setState({ userId: text })}
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
            onChangeText={text => this.setState({ password: text })}
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
            onChangeText={text => this.setState({ password_chk: text })}
          />
        </View>
        <View>
          {this.state.emailAuth ?
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon style={{ marginTop: 20, marginBottom: 10, color: "green",fontSize:15 }} name="checkmark" />
              <Text style={{ marginTop: 20, marginBottom: 10, color: "green" }}>이메일 인증완료</Text>
            </View>
            :
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.setState({ toggleAuth: !this.state.toggleAuth })}>
              <Text style={{ marginTop: 20, marginBottom: 10 }}>이메일 인증하기</Text>
            </TouchableOpacity>
          }

        </View>
        {this.state.toggleAuth ? <EmailAuth complete={this.handleEmailAuth} /> : null}
        <TouchableOpacity
          onPress={() => this.handleRegister()}
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
  inputView: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderBottomColor: '#ededed',
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  Btn: {
    width: "80%",
    backgroundColor: "#0178D4",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 35
  },
  SignUpText: {
    color: "white"
  }
})

export default SignUpScreen;