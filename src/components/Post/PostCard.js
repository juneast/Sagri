import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Icon, ListItem } from 'native-base';
import computeTime from '../../modules/computeTime'
import Tag from './Tag'
import constants from '../../constants'

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
    alignSelf: "flex-start"
  },
  author: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "flex-start"
  },
  footer: {
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    alignItems: "center"
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#ccc",
    fontSize: 17,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center"
  },
  touchableText: {
    paddingLeft: 10,
    paddingRight: 20,
    color: "#ccc",
    fontSize: 11
  }
})

const PostCard = ({ post, handleTagClick, navigation, handlePostChange }) => {
  return (
    <ListItem
      noIndent
      style={{ padding: 0, backgroundColor: "#fff", width: "100%", margin: 0 }}
      onPress={() => {
        navigation.navigate({ name: 'Details', params: { item: post, handlePostChange } })
      }}>
      <View style={{ backgroundColor: "#fff", width: "100%" }}>
        <Tag tagName={post.tag} handleTagClick={handleTagClick} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ width: post.photos.length === 0 ? "100%" : "75%" }}>
            <Text style={{ alignSelf: "flex-start" }}>{post.title}</Text>
            <Text numberOfLines={2} style={styles.content}>{post.content}</Text>
          </View>
          {post.photos.length === 0 ? null :
            <View style={{ alignItems: "center", marginBottom: 15 }}>
              <Image
                style={{
                  width: (constants.width / 6),
                  height: constants.width / 6,
                  borderRadius: 5,
                  alignSelf: "center"
                }}
                source={{ uri: post.photos[0] }}
              />
              {
                post.photos.length === 1 ? null :
                  <View style ={{borderRadius: 5,position:"absolute",width:constants.width / 6, height: constants.width / 6,backgroundColor:"rgba(0,0,0,0.3)",top:0,left:0,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white", fontSize:20}}>{`+${post.photos.length}`}</Text>
                  </View>
              }

            </View>
          }

        </View>
        <Text style={styles.author}>{post.author.userId}</Text>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <TouchableOpacity style={styles.touchable}>
              <Icon style={styles.icon} name="eye" />
              <Text style={styles.touchableText}>{post.views}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Icon style={{ ...styles.icon, color: post.likes ? "skyblue" : "#ccc" }} name="thumbs-up" />
              <Text style={{ ...styles.touchableText, color: post.likes ? "skyblue" : "#ccc" }}>{post.likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Icon style={styles.icon} name="chatbubbles" />
              <Text style={styles.touchableText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ paddingRight: 20, color: "#ccc", fontSize: 13 }}>{computeTime(post.createTime)}</Text>
          </View>

        </View>
      </View>
    </ListItem>
  );

}

export default PostCard;
