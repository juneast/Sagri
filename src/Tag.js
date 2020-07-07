import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        flexWrap:"wrap"
    },
    tag : {
        fontSize:12,
        backgroundColor:"#eee",
        color:"#000",
        lineHeight:20,
        textAlign:"center",
        borderRadius:15,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:15,
    }
})

const Tag = ({tagName})=> {
    return (
        <View style={styles.container}>
            <Text style = {styles.tag}>{tagName}</Text>
        </View>
        
    );
}

export default Tag;