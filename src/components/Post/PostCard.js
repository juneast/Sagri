import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {  Text, Icon, ListItem} from 'native-base';
import computeTime from '../../modules/computeTime'
import Tag from './Tag'
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  content: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 5,
    alignSelf:"flex-start"
  },
  author: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 15,
    alignSelf:"flex-start"
  },
  footer: {
    width:"100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    height: 40,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:10,
    alignItems:"center"
  },
  footerLeft:{
    flexDirection:"row",
    alignItems:"center",
  },
  icon : {
    color:"#ccc",
    fontSize:17,
  },
  touchable : {
    flexDirection:"row",
    alignItems:"center"
  },
  touchableText : {
    paddingLeft:10,
    paddingRight:20,
    color:"#ccc",
    fontSize:11
  }
})

const PostCard = ({ post,handleTagClick ,navigation, handlePostChange}) => {
  return (
    <ListItem
            noIndent
            style={{padding:0, backgroundColor:"#fff",width:"100%",margin:0}}
            onPress={() => {
                navigation.navigate({ name: 'Details', params: { item:post, handlePostChange } })
            }}>
    <View style={{backgroundColor:"#fff",width:"100%"}}>
      <View style={styles.container}>
        <Tag tagName={post.tag} handleTagClick={handleTagClick}/>
        <Text style={{alignSelf:"flex-start"}}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.author}>{post.author.userId}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.touchable}>
            <Icon style={styles.icon} name="eye" />
            <Text style={styles.touchableText}>{post.views}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <Icon style={{...styles.icon, color:post.likes?"skyblue":"#ccc"}} name="thumbs-up" />
            <Text style={{...styles.touchableText, color:post.likes?"skyblue":"#ccc"}}>{post.likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <Icon style={styles.icon}  name="chatbubbles" />
            <Text style={styles.touchableText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{paddingRight:20,color:"#ccc",fontSize:13}}>{computeTime(post.createTime)}</Text>
        </View>

      </View>
      </View>
      </ListItem>
  );

}

export default PostCard;
