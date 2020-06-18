import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Item, Input,  Button,Icon, Badge } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    icons: {
        flexDirection: "row",
        width: 70,
        justifyContent: "space-between"
    },
    badge: {
        fontSize: 55,
        marginRight: 10
    },
    profile: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        justifyContent: "space-between"
    }
})

const Profile = () => {
    return (
        <TouchableOpacity activeOpacity={0.5} tvParallaxProperties={{"pressDuration":1}}>
        <View style={styles.profile}>
            <View style = {{flexDirection:"row"}}>
                <Icon name="contact" style={styles.badge} />
                <View style={{ width: "73%", height: "100%" }}>
                    <Text>이름</Text>
                    <Text numberOfLines={2} style={{ color: "#aaa", fontSize: 13 }}>dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</Text>
                </View>
            </View>
            <Text style={{ color: "#aaa", fontSize: 13}}>오후 4:11</Text>
        </View>
        </TouchableOpacity>
    )
}
const Chat = ({ tagName }) => {
    return (

        <View style={styles.root}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20 }}>채팅</Text>
                <View style={styles.icons}>
                    <Icon name="search" />
                    <Icon name="settings" />
                </View>
            </View>
            <ScrollView>
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile />
                <Profile /> 
            </ScrollView>
        </View>

    );
}

export default Chat;