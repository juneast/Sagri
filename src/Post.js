import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, FlatList, TextInput, TouchableOpacity} from 'react-native'
import { Text, Icon, Spinner, Footer, Toast, Root } from 'native-base';
import Tag from './Tag'
import Comment from './Comment'
import axios from 'axios'
import computeTime from './modules/computeTime'
const Post = ({ route, navigation}) => {
    const post = route.params.item;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const [like, setLike] = useState(route.params.item.likes);
    
    const getCommentRequest = async () => {
        try {
            axios({
                url: global.API_URI + "/api/post/" + post.postid,
                method: 'get',
            })
            const response = await axios({
                url: global.API_URI + "/api/comment/" + post.postid,
                method: 'get',

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
                Toast.show({
                    text: "댓글이 등록됐습니다.",
                    position: "bottom",
                    style: {width:"70%",bottom : '30%',backgroundColor:"rgba(0,0,0,0.5)",borderRadius:25, alignSelf:"center"},
                    textStyle:{textAlign:"center"}
                })
                getCommentRequest();
            }
            
        } catch (err) {
            Toast.show({
                text: "댓글 등록에 실패했습니다",
                position: "bottom",
                type:"danger",
                style: {width:"70%",bottom : '30%',borderRadius:25, alignSelf:"center"},
                textStyle:{textAlign:"center"}
            })
            console.log(err);
        }
    }
    const postLikeRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/post/like?postid=" + post.postid,
                method: 'get',
            })
            if (response.status === 200) {
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
                url: global.API_URI + "/api/post/unlike?postid=" + post.postid,
                method: 'get',
            })
            if (response.status === 200) {
                
                setLike(false);
            }

        } catch (err) {
            alert("좋아요취소실패")
            console.log(err);
        }
    }
    useEffect(() => {
        if (!isLoading) {
            getCommentRequest();
        }
    });

 
        

    return (
        !isLoading ?
            <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
            :
            <Root>
            <View style={{ height: "100%" }}>
                <ScrollView style={{marginBottom:50}}>
                    <View style={styles.view}>
                        <Tag tagName={post.tag}/>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text>{post.author.userId}</Text>
                        <Text>{computeTime(post.createTime)}</Text>
                        <View style={styles.divider}></View>
                        <Text>{post.content}</Text>
                        <View style={styles.otherInfo}>
                            <TouchableOpacity onPress={()=>{
                                
                                like ? postUnlikeRequest() : postLikeRequest();
                            }}>
                                <Icon active name="thumbs-up" style={{ color: like ? "skyblue" : "#ccc",fontSize: 25 }} />
                            </TouchableOpacity>
                            <View style={styles.dividerCol}></View>
                            <Icon name="chatboxes" style={{ color: "#ccc", fontSize: 25 }} />
                            <View style={styles.dividerCol}></View>
                            <Icon name="share" style={{ color: "#ccc", fontSize: 25 }} />
                        </View>
                    </View>
                    <View style={styles.sagri}><Text style={styles.sagriText}>SAGRI</Text></View>
                    <View style={{ ...styles.sagri, height: "auto" }}>
                        {comments.map((item,index)=> <View key={index} style ={{width:"100%"}}><Comment key={index} info={item} /></View>)}
                    </View>
                </ScrollView>
                <View style={styles.textInput}>
                    <TextInput value={content} style={{ width: "90%" }} placeholder="댓글을 남겨주세요." onChangeText={(text) => setContent(text)} />
                    <TouchableOpacity disabled={content===""? true : false} onPress={() => {
                        postCommentRequest();
                        setContent("");
                    }}>
                        <Text style={{ color: content===""? "#ccc" : "red", fontSize: 13 }}>등록</Text>
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