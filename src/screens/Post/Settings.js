import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Spinner, ListItem, List, Left, Right } from 'native-base'
import axios from 'axios';
import constants from '../../constants'

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  upper: {
    width: constants.width,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white"
  },
  badge: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  nameText: {
    fontSize: 20
  },
  logoutButton: {
    padding: 20,
    backgroundColor: "skyblue",
    borderRadius: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
})

const Settings = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [userId, setUserId] = React.useState();
  React.useEffect(() => {
    if (loading) {
      getUserInfo()
    }
  })

  const getUserInfo = async () => {
    try {
      const result = await axios.get(global.API_URI + '/api/user/info')
      setLoading(false)
      setUserId(result.data.userId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    loading ? <View style={{ ...styles.container, justifyContent: "center" }}><Spinner /></View>
      :
      <View style={styles.container}>
        <View style={styles.upper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.badge}>
              <Icon style={{ color: 'white' }} name="person" />
            </View>
            <Text style={styles.nameText}>{userId}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })}>
            <Text style={{ color: 'white' }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", marginTop: 30, backgroundColor: "white" }}>
          <List>
            <ListItem noIndent style={{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:"black"}}>
              <Text>정보</Text>
            </ListItem>
            <ListItem onPress={() => alert("1")}>
              <Left>
                <Text>내 정보 수정</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
        <View style={{ width: "100%", marginTop: 30, backgroundColor: "white" }}>
          <List>
            <ListItem noIndent style={{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:"black"}}>
              <Text>글 목록</Text>
            </ListItem>
            <ListItem onPress={() => navigation.navigate("MyPosts")}>
              <Left>
                <Text>내가 쓴 글 목록</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>내가 좋아한 글 목록</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>내가 댓글 쓴 글 목록</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
      </View >
  );
}

export default Settings; 