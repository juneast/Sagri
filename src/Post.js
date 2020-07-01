import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Text, Icon, Spinner, Footer } from 'native-base';
import Tag from './Tag'
import Comment from './Comment'
import axios from 'axios'

const Post = ({ route, navigation }) => {
    const post = route.params.item;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const getCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + post.postid,
                method: 'get',
                headers: {
                    'x-access-token': global.token
                }
            })
            if (response.status === 200) {
                setComments(response.data);
                setIsLoading(true);
            }

        } catch (err) {
            alert("조회에 실패했습니다!")
            console.log(err);
        }
    }
    const postCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + post.postid,
                method: 'post',
                headers: {
                    'x-access-token': global.token
                },
                data: {
                    content
                }
            })
            if (response.status === 200) {
                alert("댓글이 등록되었습니다")
                getCommentRequest();
            }

        } catch (err) {
            alert("댓글등록실패")
            console.log(err);
        }
    }
    useEffect(() => {
        if (!isLoading) {
            getCommentRequest();
        }

    });

    const _renderItem = ({ item, index }) => (
        <Comment info={item} />
    );

    return (
        !isLoading ?
            <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
            :
            <View style={{ height: "100%" }}>
                <ScrollView style={{marginBottom:50}}>
                    <View style={styles.view}>
                        <Tag tagName="Sagri" />
                        <Text style={styles.title}>{post.title}</Text>
                        <Text>{post.author.userId}</Text>
                        <Text>15분</Text>
                        <View style={styles.divider}></View>
                        <Text>{post.content}</Text>
                        <View style={styles.otherInfo}>
                            <Icon active name="thumbs-up" style={{ color: "#ccc", fontSize: 25 }} />
                            <View style={styles.dividerCol}></View>
                            <Icon name="chatboxes" style={{ color: "#ccc", fontSize: 25 }} />
                            <View style={styles.dividerCol}></View>
                            <Icon name="share" style={{ color: "#ccc", fontSize: 25 }} />
                        </View>
                    </View>
                    <View style={styles.sagri}><Text style={styles.sagriText}>SAGRI</Text></View>
                    <View style={{ ...styles.sagri, height: "auto" }}>
                        <FlatList
                            style={{ width: "100%" }}
                            data={comments}
                            renderItem={_renderItem}
                            keyExtractor={(item, index) => item._id}
                        />
                    </View>
                </ScrollView>
                <View style={styles.textInput}>
                    <TextInput value={content} style={{ width: "90%" }} placeholder="댓글을 남겨주세요." onChangeText={(text) => setContent(text)} />
                    <TouchableOpacity onPress={() => {
                        postCommentRequest();
                        setContent("");
                    }}>
                        <Text style={{ color: "red", fontSize: 13 }}>등록</Text>
                    </TouchableOpacity>
                </View>


            </View>

    );
}

const styles = StyleSheet.create({
    view: {
        padding: 15,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    divider: {
        height: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 15,
        marginBottom: 15,
    },
    otherInfo: {
        color: "#eee",
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    dividerCol: {
        borderLeftColor: "#bbb",
        borderLeftWidth: 1,
    },
    sagri: {
        marginTop: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        height: 50,
    },
    sagriText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ccc",
    },
    textInput: {
        position: "absolute",
        left: 0,
        bottom: 0,
        height: 50,
        width: "100%",
        backgroundColor: "white",
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    }
});

export default Post;