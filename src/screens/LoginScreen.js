import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Hoshi  } from 'react-native-textinput-effects';

class LoginScreen extends React.Component {
  state={
    userid:"",
    password:""
  }
  render(){
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
            onChangeText={text => this.setState({userid:text})}
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
            onChangeText={text => this.setState({password:text})}
        />

        </View>

        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("Home")}
                        style={styles.loginBtn}>
                        <Text style={styles.loginText}>로그인</Text> 
        </TouchableOpacity>
        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("SignUp")}>
                        <Text style={styles.forgot}>회원가입</Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Forget")}>
          <Text style={styles.forgot}>비밀번호 초기화</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#000000",
    marginBottom:90
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
  forgot:{
    color:"#0178D4",
    marginBottom:35,
    fontSize:15
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#0178D4",
    borderRadius:10,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:35
  },
  loginText:{
    color:"white"
  }
});

export default LoginScreen; 