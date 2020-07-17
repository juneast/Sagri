import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {  Icon, Spinner, Card, CardItem, Left, Body } from 'native-base';
import axios from 'axios'

const ChatRoom = ({ RoomName }) => {
    const abc = RoomName.users.map((item) => <Text>{item.userId}</Text>)

    return (
        <Card styles={{ flex: 0 }}>
            <CardItem>
                <Left>
                    <Body>
                        {abc}
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
            </CardItem>
        </Card>
    )
}

export default class ChattingRoomList extends React.Component {

    state = {
        chat_room: [],
        isLoading: true
    }

    sendPost = async () => {
        try {
            const chat_room_ = await axios({
                url: global.API_URI + "/api/room",//global.API_URI_chat
                method: 'get',
                headers: {
                    'x-access-token': global.token
                }
            })
            //console.log(chat_room_.data)
            //console.log(data_.data) // data에만 들어있었다
            this.setState({
                chat_room: chat_room_.data,
                isLoading: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.sendPost();
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate({ name: 'Chat', params: { item } })}>
            <ChatRoom key={index} RoomName={item} Time={"시간~"} content={"채팅방~"} />
        </TouchableOpacity>
    );

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
        }
        return (

            <FlatList
                data={this.state.chat_room}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
            //refreshing={this.state.refreshing}
            //onRefresh={this._handleRefresh}
            //onEndReached={this._handleLoadMore}
            //onEndReachedThreshold={0.1}
            />
        );
    }
}