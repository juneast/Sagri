import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const ForgetScreen = ({ navigation }) => {
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleButtonClick = ()=>{
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <CustomInput label="아이디" secure={false} onChangeText={setUserId} />
      <CustomInput label="비밀번호" secure={true} onChangeText={setPassword} />
      <CustomButton label="비밀번호 찾기" onPress={handleButtonClick}/>
    
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 50,
    paddingTop: "70%",
  },
})

export default ForgetScreen; 
