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
                url: "http://54.180.167.12:5000/api/post",
                method:'post',
                headers : {
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQzOWRkYTI5MWVmMTU3NzBkZWFkNDUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTkzMDUzMTgyLCJleHAiOjE1OTM2NTc5ODIsImlzcyI6IkxESiIsInN1YiI6InVzZXJJbmZvIn0.Ojtc_As3BA3HO1_cdKLTh7svEW9BntliR611pbdg7Uc',
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