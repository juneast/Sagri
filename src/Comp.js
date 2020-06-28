import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default function CardImageExample({title,content,author}){

    return (
          <Card styles={{flex:0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{title}</Text>
                  <Text note>{author}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text>{content}</Text>
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
              <Body>

              </Body>
            </CardItem>
          </Card>
    );
  
}