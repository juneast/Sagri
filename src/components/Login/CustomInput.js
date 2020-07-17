import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

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
    inputText: {
        height: 50,
        paddingRight: 20,
        width: "100%",
        color: "skyblue"
    },

});

const CustomInput = ({ label, secure, onChangeText, onSubmitEditing, setRefer}) => {
    return (
        <View style={styles.inputView} >
            <Hoshi
                ref={item=>setRefer ? setRefer(item) : null}
                onSubmitEditing={(item)=>onSubmitEditing? onSubmitEditing() : null}
                label={label}
                secureTextEntry={secure}
                style={styles.inputText}
                // this is used as active and passive border color
                borderColor={'skyblue'}
                inputPadding={16}
                labelHeight={24}
                labelStyle={{ color: 'skyblue' }}
                inputStyle={{ color: '#008299' }}
                autoCapitalize="none"
                onChangeText={text => onChangeText(text)}
            />
        </View>
    );
}



export default CustomInput; 