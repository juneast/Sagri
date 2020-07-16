import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {Button} from 'native-base'
import { Hoshi } from 'react-native-textinput-effects';

const styles = StyleSheet.create({
    loginBtn: {
        width: "100%",
        backgroundColor: "skyblue",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 35
    },
    loginText: {
        color: "white"
    }

});

const CustomButton = ({ label, onPress }) => {
    return (
        <Button
            info
            onPress={() => {
                onPress();
            }}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>{label}</Text>
        </Button>
    );
}



export default CustomButton; 