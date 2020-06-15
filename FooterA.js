import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterA extends Component {

  render() {

    return (
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="apps" />
            <Text>타임라인</Text>
          </Button>
          <Button vertical>
            <Icon active name="search" />
            <Text>검색</Text>
          </Button>
          <Button vertical>
            <Icon name="chatboxes" />
            <Text>대화</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>내정보</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}