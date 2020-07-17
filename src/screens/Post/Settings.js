import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Settings = ({ navigation }) => {
  return (
    <View style={{height:"100%",width:"100%", justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity style={{padding:20, backgroundColor:"skyblue"}} onPress={()=>navigation.reset({ index: 0, routes: [{ name: "Login" }] })}>
        <Text >로그인으로 복귀!!</Text>
    </TouchableOpacity>
    </View >
  );
}

export default Settings; 