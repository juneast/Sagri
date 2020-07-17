import React, { Component,useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { CustomButton, CustomInput } from '../../components/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 50,
    paddingTop: 170,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "skyblue",
    marginBottom: 50
  },
  forgot: {
    color: "skyblue",
    marginBottom: 35,
    fontSize: 15
  },

});

const LoginScreen = ({ navigation }) => {
  let idReferenece = useRef()
  let passwordReferenence = useRef()
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const sendLoginRequest = async () => {
    if(userId==="" || password===""){
      alert("아이디와 비밀번호를 확인해주세요")
      return null;
    }
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
        navigation.reset({ index: 0, routes: [{ name: "Home" }] })
      }
    } catch (err) {
      alert("아이디와 비밀번호를 확인해주세요")
      console.log(err);
    }
  }
  const setIdRefer = (item)=> {
    idReferenece=item;
  }
  const setPasswordRefer = (item)=> {
    passwordReferenence=item;
  }
  
  const handleIdSumbit = ()=>{
      passwordReferenence.focus();
  }
  const handlePasswordSumbit = ()=>{
    sendLoginRequest()
}
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SAGRI</Text>
      <CustomInput label="아이디" secure={false} onChangeText={setUserId} onSubmitEditing={handleIdSumbit} setRefer={setIdRefer}/>
      <CustomInput label="비밀번호" secure={true} onChangeText={setPassword} onSubmitEditing={handlePasswordSumbit} setRefer={setPasswordRefer}/>
      <CustomButton label="로그인" onPress={sendLoginRequest}/>
      
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
          <Text style={styles.forgot}>비밀번호 찾기</Text>
        </TouchableOpacity>

        <Text style={{ ...styles.forgot, marginLeft: 10, marginRight: 10 }}>/</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EmailAuth")}>
          <Text style={styles.forgot}>회원가입</Text>
        </TouchableOpacity>
      </View>

    </View >
  );
}

export default LoginScreen; 