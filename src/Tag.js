import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    tag : {
        fontSize:12,
        backgroundColor:"#eee",
        color:"#000",
        lineHeight:20,
        textAlign:"center",
        width:50,
        borderRadius:10,
        marginBottom:15,
    }
})

const Tag = ({tagName})=> {
    return (
        <Text style = {styles.tag}>{tagName}</Text>
    );
}

export default Tag;