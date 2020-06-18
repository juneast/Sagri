import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff'
    },
    searchBar: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fafafa",
        borderRadius: 20,
        width: "90%",
        margin: 10,
        height: 35,
        borderColor: "#777",
        borderWidth: StyleSheet.hairlineWidth
    },
    middelView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    middleViewText: {
        color: "#aaa",
        fontSize: 13
    }
})

const RecentSearch = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={{ ...styles.middelView, borderTopColor: "#ccc", borderTopWidth: StyleSheet.hairlineWidth }}>
                <Text>최근검색내용</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#ccc", fontSize: 13, marginRight: 20 }}>06.17</Text>
                    <TouchableWithoutFeedback><Icon name="close" style={{ color: "#ccc", fontSize: 20 }} /></TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Search = ({ tagName }) => {
    return (
        <View style={styles.root}>
            <Header style={{ backgroundColor: "#fff", alignItems: "center", height: "auto", width: "auto" }}>
                <View style={styles.searchBar}>
                    <Icon name="ios-search" style={{ marginLeft: 10 }} />
                    <Input placeholder="Search" placeholderTextColor="#ccc"/>
                </View>
                <TouchableWithoutFeedback><Text style={{ marginRight: 10 }}>취소</Text></TouchableWithoutFeedback>
            </Header>
            <View>
                <View style={styles.middelView}>
                    <Text style={styles.middleViewText}>최근검색</Text>
                    <TouchableWithoutFeedback onPress={() => alert("as")}><Text style={styles.middleViewText}>전체삭제</Text></TouchableWithoutFeedback>
                </View>
                <RecentSearch />
                <RecentSearch />
                <RecentSearch />
                <RecentSearch />
                <RecentSearch />
            </View>
        </View>
    );
}

export default Search;