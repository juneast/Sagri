import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class CardImageExample extends Component {

  render() {

    return (
          <Card styles={{flex:0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>제목</Text>
                  <Text note>작성자</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text>a</Text>
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
}