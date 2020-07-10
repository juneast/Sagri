import React from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

const FooterMenu =({onMake, navigation})=> {
    return (
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="apps"onPress = {()=>navigation.push("Home")} />
            <Text>타임라인</Text>
          </Button>
          <Button vertical onPress = {()=>navigation.navigate("검색")}>
            <Icon active name="search" />
            <Text>검색</Text>
          </Button>
          <Button vertical onPress = {()=>navigation.navigate("채팅")}>
            <Icon name="chatboxes" />
            <Text>대화</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>내정보</Text>
          </Button>
          <Button vertical onPress = {()=>navigation.navigate({ name: '글작성', params: { onMake } })}>
            <Icon name="create" />
            <Text>글작성</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  export default FooterMenu;