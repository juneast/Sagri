import React from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

const FooterMenu =({navigation})=> {
    return (
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="apps" />
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
          <Button vertical onPress = {()=>navigation.navigate("글작성")}>
            <Icon name="create" />
            <Text>글작성</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  export default FooterMenu;