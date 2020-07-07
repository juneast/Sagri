import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import computeTime from './modules/computeTime'
import Tag from './Tag'
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25
  },
  content: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 5
  },
  author: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 15
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    height: 40,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:25,
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

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <Card styles={{ flex: 0 }}>

      <View style={styles.container}>
        <Tag tagName="아무거나" />
        <Text>{post.title}</Text>
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
            <Text style={{...styles.touchableText, color:post.likes?"skyblue":"#ccc"}}>{post.views}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <Icon style={styles.icon}  name="chatbubbles" />
            <Text style={styles.touchableText}>{post.views}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{paddingRight:20,color:"#ccc",fontSize:13}}>{computeTime(post.createTime)}</Text>
        </View>

      </View>
    </Card>
  );

}

export default PostCard;



/* <CardItem>
              <Left>
                <Body>
                  <Text>{post.title}</Text>
                  <Text note>{post.author.userId}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text>{post.content}</Text>
            </CardItem>
            <CardItem>
              <Left>
              <Button transparent>
                  <Icon active name="eye" />
                </Button>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                </Button>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                </Button>
              </Left>
              <Right>
                <Text>{computeTime(post.createTime)}</Text>
                </Right>
              <Body>

              </Body>
            </CardItem> */