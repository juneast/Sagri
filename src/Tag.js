import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tag: {
        fontSize: 12,
        backgroundColor: "#eee",
        color: "#000",
        lineHeight: 20,
        textAlign: "center",
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
    }
})

const Tag = ({ tagName, handleTagClick }) => {

    return (
        <TouchableOpacity
            disabled={handleTagClick === undefined ? true : false}
            style={styles.container}
            onPress={()=>{
                console.log("CLICK")
                handleTagClick(tagName===undefined?"싸그리":tagName);
            }}
        >
            <Text style={styles.tag}>{tagName===undefined?"싸그리":tagName}</Text>
        </TouchableOpacity>

    );
}

export default Tag;