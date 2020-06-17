import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base'

const styles = StyleSheet.create({
    root : {
        padding : 15,
        borderTopColor:"#DDD",
        borderTopWidth:StyleSheet.hairlineWidth,
    },
    up : {
        color: "#AAA"
    },
    middle : {
        marginTop : 10,
        marginBottom : 10,
    },
    down : {
        flexDirection : "row",
        justifyContent : "space-between"
    },
    downLeft : {
        flexDirection:"row",
        alignItems:"center",
        color:"#ccc",
    },
    downLeftText : {
        fontSize:12, 
        color:"#aaa"
    },
    downLeftDivider :{
        marginLeft:5,
        marginRight:5,
        color:"#aaa"
    },
    downLeftIcon : {
        fontSize:12,
        marginRight:5,
        color:"#aaa"
    }
})

const Comment = ({tagName})=> {
    return (
        <View style = {styles.root}>
            <Text style = {styles.up}>소속 · 작성자</Text>
            <Text style =  {styles.middle}>댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용</Text>
            <View style = {styles.down}>
                <View style = {styles.downLeft}>
                    <Text style={styles.downLeftText}>1분</Text>
                    <Text style={styles.downLeftDivider}>·</Text>
                    <View style = {styles.downLeft}>
                        <Icon name="thumbs-up" style={styles.downLeftIcon}/>
                        <Text style={styles.downLeftText}>좋아요</Text>
                    </View>
                    <Text style={styles.downLeftDivider}>·</Text>
                    <View style = {styles.downLeft}>
                        <Icon name="chatbubbles" style={styles.downLeftIcon}/>
                        <Text style={styles.downLeftText}>대댓글</Text>
                    </View>
                </View>
                <Icon name="more"/>
            </View>
        </View>
    );
}

export default Comment;