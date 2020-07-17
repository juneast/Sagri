import React, { Component } from 'react';
import {  StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Header, Icon} from 'native-base'
import axios from 'axios';
import Action from './Action'

const styles = StyleSheet.create({

    title: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 15
    },
    header: {
        marginBottom: 5,
        height: 55,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 3 },
        elevation: 3,
    }
})

const PostHeader = () => {

    return (
        <Header style={styles.header}>
            <Icon name="arrow-round-back"/>
            <TouchableOpacity>
                <Text style={{ color: "black" }}>수정</Text>
            </TouchableOpacity>
        </Header>
    )

}


export default PostHeader;