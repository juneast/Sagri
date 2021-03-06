import React, { Component } from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Header } from 'native-base'
import axios from 'axios'
import { Action } from '../../components/index'

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
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 15
    },
    header: {
        marginBottom: 5,
        height: 60,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 3 },
        elevation: 3,
    }
})
const UpdateBoard = ({ route, navigation }) => {
    const [title, setTitle] = React.useState(route.params.post.title);
    const [content, setContent] = React.useState(route.params.post.content);
    const [tag, setTag] = React.useState(route.params.post.tag);

    const sendPost = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/post/" + route.params.post.postid,
                method: 'put',
                data: {
                    title,
                    content,
                    tag
                }
            })
            if (response.status === 200) {
                route.params.isChange();
                navigation.goBack(null);
            } else {
                alert("실패")
            }

        } catch (err) {
            console.log(err);
        }
    }
    console.log(tag);
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <Header style={styles.header}>
                <Action setTag={setTag} firstItem={tag} />
                <TouchableOpacity 
                    style={{ position: "absolute", right: 10, padding: 10 }} disabled={title === "" || content === "" || tag === "" ? true : false}
                    onPress={() => sendPost()}>
                    <Text style={{ color: title === "" || content === "" || tag === "" ? "#ccc" : "black" }}>수정</Text>
                </TouchableOpacity>
            </Header>
            <View style={styles.root}>

                <TextInput
                    style={styles.title}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder="제목을 입력하세요"
                />
                <TextInput multiline placeholder="내용을 입력하세요"
                    style={{ borderColor: 'gray', lineHeight: 35, padding: 5 }}
                    onChangeText={text => setContent(text)}
                    value={content}
                />

            </View>

        </View>

    );
}


export default UpdateBoard;