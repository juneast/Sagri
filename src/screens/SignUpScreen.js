import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Hoshi } from 'react-native-textinput-effects';
import { Button, Icon, Item,  Input } from 'native-base'
import axios from 'axios';
import EmailAuth from '../components/EmailAuth'
import CustomButton from '../components/CustomButton'
import CustomCheckInput from '../components/CustomCheckInput'
function isEmail(asValue) {
  var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function isPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/; //  8 ~ 15자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

const SignUpScreen = ({navigation})=>{
  const [id, setId] = React.useState({ text : "", flag : false });
  const [password, setPassword] = React.useState({ text : "", flag : false });
  const [passwordCheck, setPasswordCheck] = React.useState({ text : "", flag : false });
  const [toggleAuth, setToggleAuth] = React.useState(false);
  const [emailAuth, setEmailAuth] = React.useState(false);

  const handleIdChange = (text) => {
    setId({ text : text, flag : text.length<5 ? false : true})
  }
  const handlePasswordChange = (text) => {
    setPassword({ text : text, flag : isPassword(text) ? true : false})
  }
  const handlePasswordCheckChange = (text) => {
    setPasswordCheck({ text : text, flag :password.text===text && isPassword(text)? true : false})
  }
  const handleRegister = async () => {
    if (!id.flag) {
      return alert("아이디를 입력해주세요")
    } else if (!password.flag) {
      return alert("비밀번호는 8 ~ 15자 영문, 숫자 조합이어야 합니다.")
    } else if (!passwordCheck.flag) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.")
    } else if (!emailAuth){
      return alert("이메일을 인증해주세요")
    }
    try {
      const response = await axios({
        url: global.API_URI + "/api/user/register",
        method: 'post',
        data: {
          userId : id.text,
          password : password.text
        }
      })
      if (response.status === 200) {
        alert("회원가입에 성공했습니다.")
        navigation.goBack();
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
  const handleEmailAuth = () => {
    setEmailAuth(true)
    setToggleAuth(false)
  }

    return (
      <View style={styles.container}>
        <CustomCheckInput label="아이디" flag={id.flag} onChangeText={handleIdChange} value={id.text}/> 
        <CustomCheckInput label="비밀번호" secure={true} flag={password.flag} onChangeText={handlePasswordChange} value={password.text}/> 
        <CustomCheckInput label="비밀번호 확인" secure={true} flag={passwordCheck.flag} onChangeText={handlePasswordCheckChange} value={passwordCheck.text}/> 
        <View>
          {emailAuth ?
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon style={{ marginTop: 20, marginBottom: 10, color: "green",fontSize:15 }} name="checkmark" />
              <Text style={{ marginTop: 20, marginBottom: 10, color: "green" }}>이메일 인증완료</Text>
            </View>
            :
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => setToggleAuth(!toggleAuth)}>
              <Text style={{ marginTop: 20, marginBottom: 10, color:"skyblue" }}>이메일 인증하기</Text>
            </TouchableOpacity>
          }

        </View>
        {toggleAuth ? <EmailAuth complete={handleEmailAuth} /> : null}
        <CustomButton label="회원가입" onPress ={handleRegister}/>

      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 50,
    paddingTop: 170,
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