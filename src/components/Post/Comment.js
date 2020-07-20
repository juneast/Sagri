import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon, ActionSheet, Toast } from 'native-base'
import computeTime from '../../modules/computeTime'
import axios from 'axios'
const styles = StyleSheet.create({
    root: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        borderTopColor: "#DDD",
        borderTopWidth: StyleSheet.hairlineWidth,
        width:"100%"
    },
    up: {
        color: "#AAA"
    },
    middle: {
        marginTop: 10,
        marginBottom: 10,
    },
    down: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    downLeft: {
        flexDirection: "row",
        alignItems: "center",
        color: "#ccc",
    },
    downLeftText: {
        fontSize: 12,
        color: "#aaa"
    },
    downLeftDivider: {
        marginLeft: 5,
        marginRight: 5,
        color: "#aaa"
    },
    downLeftIcon: {
        fontSize: 12,
        marginRight: 5,
        color: "#aaa"
    }
})




const Comment = ({ key, comment, onRemove, onPress, handleLikeComment }) => {
    const commentLikeRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/like?commentid=" + comment.commentid,
                method: 'get',
            })
            if (response.status === 200) {
                handleLikeComment(comment.commentid, comment.parentid);
            }

        } catch (err) {
            alert("좋아요실패")
            console.log(err);
        }
    }
    const commentUnlikeRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/unlike?commentid=" + comment.commentid,
                method: 'get',
            })
            if (response.status === 200) {
                handleLikeComment(comment.commentid, comment.parentid);
            }

        } catch (err) {
            alert("좋아요취소실패")
            console.log(err);
        }
    }
    const deleteCommentRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/comment/" + comment.commentid,
                method: 'delete',
            })
            if (response.status === 200) {
                onRemove();
                Toast.show({
                    text: "댓글을 삭제했습니다",
                    position: "bottom",
                    style: { width: "70%", bottom: '30%', borderRadius: 25, alignSelf: "center" },
                    textStyle: { textAlign: "center" }
                })
            }

        } catch (err) {
            Toast.show({
                text: "댓글 삭제에 실패했습니다.",
                position: "bottom",
                type: "danger",
                style: { width: "70%", bottom: '30%', borderRadius: 25, alignSelf: "center" },
                textStyle: { textAlign: "center" }
            })
            console.log(err);
        }
    }
    const handleMoreOption = (index) => {
        if (index === 2) {

        } else {
            if (comment.isAuthor) {
                if (index === 0) {
                    Alert.alert(
                        "삭제",
                        "정말 삭제하시겠습니까?",
                        [
                            { text: "확인", onPress: () => deleteCommentRequest() },
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
    const handleLikeClick = ()=>{
        if(comment.likes){
            commentUnlikeRequest();
        } else {
            commentLikeRequest();
        }
    }
    return (
        comment.deleted ?
        <View style={{...styles.root,paddingBottom:15}}><Text style={{}}>{comment.content}</Text></View>
        :
        <View style={{
            ...styles.root,
            backgroundColor: !comment.parentid || comment.parentid === 0 ? "white" : "#eee",
            paddingLeft: !comment.parentid || comment.parentid === 0 ? 15 : 40
        }}>
            <Text style={styles.up}>{comment.author.userId}</Text>
            <Text style={styles.middle}>{comment.content}</Text>
            <View style={styles.down}>
                <View style={styles.downLeft}>
                    <Text style={styles.downLeftText}>{computeTime(comment.createTime)}</Text>
                    <Text style={styles.downLeftDivider}>·</Text>

                    <TouchableOpacity style={styles.downLeft} onPress={()=>handleLikeClick()}>
                        <Icon name="thumbs-up" style={{...styles.downLeftIcon, color:comment.likes?"skyblue":"#aaa"}} />
                        <Text style={{...styles.downLeftText, color:comment.likes?"skyblue":"#aaa"}}>{comment.likeCount===0 ? "좋아요" : comment.likeCount}</Text>
                    </TouchableOpacity>

                    {
                        !comment.parentid || comment.parentid === 0 ?
                            <Text style={styles.downLeftDivider}>·</Text>
                            :
                            null
                    }
                    {
                        !comment.parentid || comment.parentid === 0 ?
                            <TouchableOpacity onPress={()=>onPress(comment.commentid)}>
                            <View style={styles.downLeft}>
                                <Icon name="chatbubbles" style={styles.downLeftIcon} />
                                <Text style={styles.downLeftText}>대댓글</Text>
                            </View>
                            </TouchableOpacity>
                            :
                            null
                    }

                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => ActionSheet.show(
                    {
                        options: ["삭제"],
                        cancelButtonIndex: 2,
                        destructiveButtonIndex: 2
                    },
                    index => {
                        handleMoreOption(index)
                    }
                )}>
                    <Icon name="more" />
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default Comment;