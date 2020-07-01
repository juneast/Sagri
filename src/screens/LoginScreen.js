import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const sendLoginRequest = async () => {
    try {
      const response = await axios({
        url: global.API_URI + "/api/user/login",
        method: 'post',
        data: {
          userId,
          password
        }
      })
      if (response.status === 200) {
        global.token = response.data.token;
        navigation.reset({index:0, routes:[{name:"Home"}]})
      }
    } catch (err) {
      alert("아이디와 비밀번호를 확인해주세요")
      console.log(err);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>이미지 로고</Text>
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
          onChangeText={text => setUserId(text)}
        />

      </View>
      <View style={styles.inputView} >
        <Hoshi
          label={'비밀번호'}
          secureTextEntry
          style={styles.inputText}
          // this is used as active and passive border color
          borderColor={'#CCCCCC'}
          inputPadding={16}
          labelHeight={24}
          labelStyle={{ color: '#999999' }}
          inputStyle={{ color: '#000000' }}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
        />

      </View>

      <TouchableOpacity
        onPress={() => {
          sendLoginRequest();
          

        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.forgot}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
        <Text style={styles.forgot}>비밀번호 초기화</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000000",
    marginBottom: 90
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
  forgot: {
    color: "#0178D4",
    marginBottom: 35,
    fontSize: 15
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#0178D4",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 35
  },
  loginText: {
    color: "white"
  }
});

export default LoginScreen; 