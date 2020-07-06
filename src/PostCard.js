import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import computeTime from './modules/computeTime'
export default function PostCard({post}){

    return (
          <Card styles={{flex:0}}>
            <CardItem>
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
            </CardItem>
          </Card>
    );
  
}