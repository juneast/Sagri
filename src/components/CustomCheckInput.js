import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import {Item,Input,Icon} from 'native-base'

const styles = StyleSheet.create({

    inputView: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        height: 60,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
});

const CustomCheckInput = ({ label, secure, onChangeText, onSubmitEditing, setRefer ,flag, value }) => {
    return (
        <View style={styles.inputView} >
            <Item style={{ borderColor: flag ? 'skyblue' : 'purple' }}>
                <Input 
                    secureTextEntry={secure}
                    autoCapitalize='none'
                    value={value} 
                    placeholder={label}
                    placeholderTextColor={'purple'}
                    style={{ color: flag ? 'skyblue' : 'purple' }} 
                    onChangeText={(text) => onChangeText(text)} />
                {
                    flag ?
                        <Icon name='checkmark-circle' style={{ color: 'skyblue' }} />
                        :
                        <Icon name='close-circle' style={{ color: 'purple' }} />
                }
            </Item>
        </View>
    );
}



export default CustomCheckInput; 