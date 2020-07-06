import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import computeTime from './modules/computeTime'
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

const Comment = ({info})=> {
    const comment = info;
    console.log(info)
    return (
        <View style = {styles.root}>
            <Text style = {styles.up}>{comment.author.userId}</Text>
            <Text style =  {styles.middle}>{comment.content}</Text>
            <View style = {styles.down}>
                <View style = {styles.downLeft}>
                    <Text style={styles.downLeftText}>{computeTime(comment.createTime)}</Text>
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