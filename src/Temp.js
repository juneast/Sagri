import React, { Component } from 'react';
import { View, StyleSheet, Button,ScrollView} from 'react-native'
import {Text,Icon} from 'native-base';
import Tag from './Tag'
export default class Temp extends Component {
    render() {
        return (
            <ScrollView>
            <View style = {styles.view}>
                <Tag tagName="Sagri"/>
                <Text style = {styles.title}>반갑습니다</Text>
                <Text>소속 · 작성자</Text>
                <Text>15분</Text>
                <View style = {styles.divider}></View>
                <Text>글내용글내용글내용글내용글내용글내용글내용글내용글내용글
                    
                    
                    내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용
                글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용
                글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용글내용
                </Text>
                <View style = {styles.otherInfo}>
                    <Icon active name="thumbs-up" style={{color:"#ccc",fontSize:25}}/>
                    <View style = {styles.dividerCol}></View>
                    <Icon name="chatboxes"  style = {{color:"#ccc",fontSize:25}} />
                    <View style = {styles.dividerCol}></View>
                    <Icon name="share"style =  {{color:"#ccc",fontSize:25}}/>
                </View>
            </View>
                <View style = {styles.sagri}><Text style= {styles.sagriText}>SAGRI</Text></View>
                <View style = {{...styles.sagri, height:500}}>
                    <Text>asdf</Text>
                    <View style = {styles.divider}></View>
                    <Text>asdf</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  view: {
      width:"100%",
      padding:15,
      backgroundColor : '#fff'
  },
  title: {
    fontSize :20,
    fontWeight:"bold",
    marginBottom:10,
  },
  divider : {
      height:5,
      borderBottomColor:"#ccc",
      borderBottomWidth:1,
      marginTop:15,
      marginBottom:15,
  },
  otherInfo : {
    color:"#eee",
    marginTop:20,
    marginBottom:20,
      flexDirection:"row",
      justifyContent:"space-around"
  },
  dividerCol : {
    borderLeftColor:"#bbb",
    borderLeftWidth:1,
  },
  sagri : {
      marginTop:10,
      backgroundColor:"#fff",
      alignItems:"center",
      height:50,
  },
  sagriText : {
      fontSize:30,
      fontWeight:"bold",
      color:"#ccc",
  }
});

