import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, ScrollView, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Image } from 'react-native'
import { Text, Icon, Spinner, Toast, Root, ActionSheet } from 'native-base';
import { Tag, Comment } from '../../components/index'
import axios from 'axios'
import computeTime from '../../modules/computeTime'
import constants from '../../constants'

const Post = ({ route, navigation }) => {
    const ref = useRef(null);
    const [state, setState] = useState({
        isLoading: false,
        isChange: false,
        post: route.params.item,
    })
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [like, setLike] = useState(route.params.item.likes);
    const [editable, setEditable] = useState(-1)

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
            ;
            setComments(arrangeComment(response.data))
        } catch (err) {
            alert("조회에 실패했습니다!")
            console.log(err);
        }
    }
    const arrangeComment = (arr)=>{
        let temp = [];
        arr = arr.filter((item,index)=>{
            if(item.parentid!==0){
                temp.push(item);
                return false;
            } else {
                arr[index].child = [];
                return true;
            }
            
        })
        temp.forEach((item)=>{
            let ind = -1;
            arr.some((cont,index)=>{
                if(cont.commentid===item.parentid){
                    arr[index].child.push(item);
                    ind = index;
                }
                return cont.commentid===item.parentid
            })
            if(ind===-1){
                arr.push({
                    "content" : "삭제된 댓글입니다.",
                    "commentid" : item.parentid,
                    "child" : [item],
                    "parentid":0,
                    "deleted":true
                })
            }
        })
        arr.sort(function(a,b){
            return b.commentid-a.commentid;
        })
        return arr;
    }
    const handleRemoveComment = () => {
        route.params.handlePostChange(state.post.postid)
        getCommentRequest();
    }
    const handleLikeComment= (index)=>{
        const temp = comments.map((item)=>{
            if(item.commentid===index){
                if(item.likes){
                    item.likes=false;
                    item.likeCount--;
                }
                else {
                    item.likes=true;
                    item.likeCount++;
                }
            }
            return item;
        })
        setComments(temp);
    }
    const handleLikeCommentComment= (cid, pid)=>{
        const temp = comments.map((item)=>{
            if(item.commentid===pid){
                item.child = item.child.map((next)=>{
                    if(next.commentid===cid){
                        if(next.likes){
                            next.likes=false;
                            next.likeCount--;
                        }
                        else {
                            next.likes=true;
                            next.likeCount++;
                        }
                    }
                    return next;
                })
            }
            return item;
        })
        setComments(temp);
    }
    const postCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + state.post.postid,
                method: 'post',
                data: {
                    content,
                    parentid: editable === -1 ? 0 : editable
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
        if (editable !== -1) {
            ref.current.focus();
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
                            {state.post.photos.map((item, index) => (
                                <TouchableWithoutFeedback
                                    key={index}
                                //onPress={() => changeSelected(item)}
                                >
                                    <View style={{ alignItems: "center", marginTop: 15, marginBottom: 15 }}>
                                        <Image
                                            style={{
                                                width: (constants.width) - constants.width / 10,
                                                height: constants.width,
                                                borderRadius: 5
                                            }}
                                            source={{ uri: item }}
                                        />
                                    </View>

                                </TouchableWithoutFeedback>
                            ))}


                            <View style={styles.otherInfo}>
                                <TouchableOpacity onPress={() => {
                                    like ? postUnlikeRequest() : postLikeRequest();
                                }}
                                    style={styles.touchContainer}
                                >
                                    <Icon active name="thumbs-up" style={{ color: like ? "skyblue" : "#ccc", fontSize: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.dividerCol}></View>
                                <TouchableOpacity onPress={() => {
                                    setEditable(0)
                                }}
                                    style={styles.touchContainer}
                                >
                                    <Icon name="chatboxes" style={{ color: "#ccc", fontSize: 25 }} />
                                </TouchableOpacity>
                                <View style={styles.dividerCol}></View>
                                <TouchableOpacity style={styles.touchContainer}>
                                    <Icon name="share" style={{ color: "#ccc", fontSize: 25 }} />
                                </TouchableOpacity>
                            </View>



                        </View>
                        <View style={styles.sagri}><Text style={styles.sagriText}>SAGRI</Text></View>
                        <View style={{ ...styles.sagri, height: "auto" }}>
                            {comments.map((item, index) => {
                                //if(!item.child) console.log(item)
                                return (
                                    <View key ={index} style={{width:"100%"}}>
                                    <Comment comment={item} onRemove={handleRemoveComment} onPress={setEditable} handleLikeComment={handleLikeComment}/>
                                    { item.child.map((next, index) => {
                                        return <Comment key={index} comment={next} onRemove={handleRemoveComment} onPress={setEditable} handleLikeComment={handleLikeCommentComment}/>
                                    })}
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>

                    <View style={{ ...styles.textInput, borderColor: "skyblue", borderWidth: 1 }}>
                        <TextInput editable={editable === -1 ? false : true} onBlur={() => setEditable(-1)} ref={ref} value={content} style={{ width: "90%" }} placeholder="댓글을 남겨주세요." onChangeText={(text) => setContent(text)} />
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
        flexDirection: "row",
        justifyContent: "space-around"
    },
    dividerCol: {
        borderLeftColor: "#bbb",
        borderLeftWidth: 1,
        height: 30,
        alignSelf: "center"
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    touchContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        width: constants.width / 4,
        alignItems: "center"
    }
});

export default Post;