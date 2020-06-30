import React, { Component } from 'react';
import { Image, View, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios'
const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        padding: 10,
    },
    title: {
        height: 40,
        borderColor: 'gray', 
        borderBottomWidth:1, 
        padding:5,
        marginBottom:15
    }
})
const MakeBoard = ({navigation}) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [buttonIndex, setButtonIndex] = React.useState(0);
    
    const sendPost = async ()=>{
        try{
            const response = await axios({ 
                url: global.API_URI+"/api/post",
                method:'post',
                headers : {
                    'x-access-token': global.token
                },
                data : {
                    title,
                    content
                }
            })
            if(response.status===200){
                alert("성공")
                navigation.goBack(null);
            } else {
                alert("실패")
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
        <View style={styles.root}>
            <TextInput
                style={styles.title}
                onChangeText={text => setTitle(text)}
                value={title}
                placeholder="제목을 입력하세요"
            />
            <TextInput multiline placeholder="내용을 입력하세요"
                style={{borderColor: 'gray', lineHeight:35,padding:5}}
                onChangeText={text => setContent(text)}
                value={content}
            />
            <Button title="버튼" onPress = {()=>sendPost()}/>
        </View>
    );
}


export default MakeBoard;