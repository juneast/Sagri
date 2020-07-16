import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Text, Icon, Spinner, Footer, Toast, Root, ActionSheet } from 'native-base';
import Tag from './Tag'
import Comment from './Comment'
import axios from 'axios'
import computeTime from './modules/computeTime'
import PostHeader from './components/PostHeader'

import PickerExample from './components/Sample'
const Post = ({ route, navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        isChange: false,
        post: route.params.item,
    })
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [like, setLike] = useState(route.params.item.likes);


    const getPostRequest = async () => {
        try {
            if (state.isChange) route.params.handlePostChange(state.post.postid)
            const response = await axios({
                url: global.API_URI + "/api/post/" + route.params.item.postid,
                method: 'get',
            })
            if (response.status === 200) {
                setState({
                    isLoading: true,
                    isChange: false,
                    post: response.data,
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + route.params.item.postid,
                method: 'get',

            })
            if (response.status === 200) {
                setComments(response.data)
            }
        } catch (err) {
            alert("조회에 실패했습니다!")
            console.log(err);
        }
    }
    const handleRemoveComment = () => {
        route.params.handlePostChange(state.post.postid)
        getCommentRequest();
    }
    const postCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + state.post.postid,
                method: 'post',
                data: {
                    content
                }
            })
            if (response.status === 200) {
                Toast.show({
                    text: "댓글이 등록됐습니다.",
                    position: "bottom",
                    style: { width: "70%", bottom: '30%', backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 25, alignSelf: "center" },
                    textStyle: { textAlign: "center" }
                })
                route.params.handlePostChange(state.post.postid)
                getCommentRequest();
            }

        } catch (err) {
            Toast.show({
                text: "댓글 등록에 실패했습니다",
                position: "bottom",
                type: "danger",
                style: { width: "70%", bottom: '30%', borderRadius: 25, alignSelf: "center" },
                textStyle: { textAlign: "center" }
            })
            console.log(err);
        }
    }
    const postLikeRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/post/like?postid=" + state.post.postid,
                method: 'get',
            })
            if (response.status === 200) {
                route.params.handlePostChange(state.post.postid)
                setLike(true);
            }

        } catch (err) {
            alert("좋아요실패")
            console.log(err);
        }
    }
    const postUnlikeRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/post/unlike?postid=" + state.post.postid,
                method: 'get',
            })
            if (response.status === 200) {
                route.params.handlePostChange(state.post.postid)
                setLike(false);
            }

        } catch (err) {
            alert("좋아요취소실패")
            console.log(err);
        }
    }
    const handleUpdate = () => {
        setState({
            isLoading: false,
            isChange: true,
            post: state.post
        })
    }
    const deletePostRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/post/" + state.post.postid,
                method: 'delete'
            })
            if (response.status === 200) {
                alert("글이 삭제됐습니다")
                route.params.handlePostChange()
                navigation.goBack();
            }

        } catch (err) {
            Toast.show({
                text: "글 삭제에 실패했습니다",
                position: "bottom",
                type: "danger",
                style: { width: "70%", bottom: '30%', borderRadius: 25, alignSelf: "center" },
                textStyle: { textAlign: "center" }
            })
            console.log(err);
        }
    }
    useEffect(() => {
        if (!state.isLoading) {
            getPostRequest();
            getCommentRequest();

        }

    });

    const handleMoreOption = (index) => {
        if (index === 2) {

        } else {
            if (state.post.isAuthor) {
                if (index === 0) {
                    navigation.navigate({ name: '글수정', params: { post: state.post, isChange: handleUpdate } })
                } else if (index === 1) {
                    Alert.alert(
                        "삭제",
                        "정말 삭제하시겠습니까?",
                        [
                            { text: "확인", onPress: () => deletePostRequest() },
                            {
                                text: "취소",
                                style: "cancel"
                            },

                        ],
                        { cancelable: false }
                    );

                }
            } else {
                Toast.show({
                    text: "권한이 없습니다",
                    position: "bottom",
                    style: { width: "70%", bottom: '30%', backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 25, alignSelf: "center" },
                    textStyle: { textAlign: "center" }
                })
            }
        }
    }

    return (
        !state.isLoading ?
            <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
            :
            <Root >
                <TouchableOpacity style={{ position: "absolute", right: 10, top: -50, zIndex: 2, padding: 10 }}
                    onPress={() => ActionSheet.show(
                        {
                            options: ["수정", "삭제"],
                            cancelButtonIndex: 2,
                            destructiveButtonIndex: 2
                        },
                        index => {
                            handleMoreOption(index)
                        }
                    )}>
                    <Icon name="more" style={{}} />
                </TouchableOpacity>
                <View style={{ height: "100%" }}>
                    <ScrollView style={{ marginBottom: 50 }}>
                        <View style={styles.view}>
                            <Tag tagName={state.post.tag} />
                            <Text style={styles.title}>{state.post.title}</Text>
                            <Text>{state.post.author.userId}</Text>
                            <Text>{computeTime(state.post.createTime)}</Text>
                            <View style={styles.divider}></View>
                            <Text>{state.post.content}</Text>
                            <View style={styles.otherInfo}>
                                <TouchableOpacity onPress={() => {
                                    like ? postUnlikeRequest() : postLikeRequest();
                                }}
                                    style={{ flexDirection: "row" }}
                                >
                                    <Icon active name="thumbs-up" style={{ color: like ? "skyblue" : "#ccc", fontSize: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.dividerCol}></View>
                                <Icon name="chatboxes" style={{ color: "#ccc", fontSize: 25 }} />
                                <View style={styles.dividerCol}></View>
                                <Icon name="share" style={{ color: "#ccc", fontSize: 25 }} />
                            </View>
                        </View>
                        <View style={styles.sagri}><Text style={styles.sagriText}>SAGRI</Text></View>
                        <View style={{ ...styles.sagri, height: "auto" }}>
                            {comments.map((item, index) => <View key={index} style={{ width: "100%" }}><Comment key={index} info={item} onRemove={handleRemoveComment} /></View>)}
                        </View>
                    </ScrollView>

                    <View style={styles.textInput}>
                        <TextInput value={content} style={{ width: "90%" }} placeholder="댓글을 남겨주세요." onChangeText={(text) => setContent(text)} />
                        <TouchableOpacity disabled={content === "" ? true : false} onPress={() => {
                            postCommentRequest();
                            setContent("");
                        }}>
                            <Text style={{ color: content === "" ? "#ccc" : "skyblue", fontSize: 13 }}>등록</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Root>

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
        color: "skyblue",
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