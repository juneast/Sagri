import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Spinner } from 'native-base';
import axios from 'axios'
const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
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
        paddingRight: 10,
        alignItems: "center"
    },
    middleViewText: {
        color: "#aaa",
        fontSize: 13
    }
})

const RecentSearch = ({ content, index, handleDelete, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(content.slice(39))}>
            <View style={{ ...styles.middelView, borderTopColor: "#ccc", borderTopWidth: StyleSheet.hairlineWidth }}>
                <Text style={{width:300}}>{content.slice(39)}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#ccc", fontSize: 13, marginRight: 10 }}>{content.slice(3,10)}</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => handleDelete(index)}><Icon name="close" style={{ color: "#ccc", fontSize: 20 }} /></TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Search = ({ tagName, navigation, route }) => {
    const [state, setState] = React.useState({
        searchList: [],
        isLoading: true,
        isStore: false,
    })
    const [content, setContent] = React.useState("")


    useEffect(() => {
        if (state.isLoading) {
            _retrieveData();
        }
        if (state.isStore) {
            _storeData();
            //_retrieveData();
        }

    })

    const _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'searchData',
                JSON.stringify(state.searchList)
            );
            setState({ isStore: false, searchList: state.searchList })
        } catch (error) {
            // Error saving data
        }
    };
    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('searchData');
            if (value === null) {
                return setState({ searchList: [], isLoading: false })
            }
            console.log("_retrieveData " + value);
            let str = ""
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== "[" && value[i] !== "]" && value[i] !== '"') {
                    str += value[i];
                }
            }
            let result = str.split(",");
            setState({ searchList: result, isLoading: false })
        } catch (error) {
            // Error retrieving data
        }
    };
    const handleInsertList = () => {
        const date = new Date()
        setState({ isStore: true, searchList: state.searchList.concat([date+content]) })
        navigation.navigate("SearchResult", { name: content, handleInsert: handleInsertListInResult })
        setContent("");
    }
    const handleDeleteList = async (index) => {
        setState({isStore : true , searchList : state.searchList.filter((item, ind) => index !== ind)});
    }
    const handleDeleteAll = async () => {
        setState({searchList : [] });
        await AsyncStorage.removeItem('searchData')
    }
    const handleInsertListInResult = async (item) => {
        try {
            const value = await AsyncStorage.getItem('searchData');
            if (value === null) {
                return setState({ searchList: [], isLoading: false })
            }
            console.log("_retrieveData " + value);
            let str = ""
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== "[" && value[i] !== "]" && value[i] !== '"') {
                    str += value[i];
                }
            }
            let result = str.split(",");
            const date = new Date()
            result.push(date+item);
            console.log(result);
            await AsyncStorage.setItem(
                'searchData',
                JSON.stringify(result)
            );
            setState({searchList : result});
        } catch (error) {
            // Error retrieving data
        }
    }
    const handleClick = (item) => {
        const date = new Date()
        setState({ isStore: true, searchList: state.searchList.concat([date+item]) })
        navigation.navigate("SearchResult", { name: item, handleInsert: handleInsertListInResult })
        setContent("");
    }
    return (
        <View style={styles.root}>
            <Header style={{ backgroundColor: "#fff", alignItems: "center", height: "auto", width: "auto" }}>
                <View style={styles.searchBar}>
                    <Icon name="ios-search" style={{ marginLeft: 10 }} />
                    <Input autoFocus={true} style={{ fontSize: 14 }} value={content} placeholder="Search" placeholderTextColor="#ccc" onChange={(item) => setContent(item.nativeEvent.text)} onSubmitEditing={() => handleInsertList()} />
                </View>
                <TouchableWithoutFeedback onPress={() => setContent("")} ><Text style={{ marginRight: 10 }}>취소</Text></TouchableWithoutFeedback>
            </Header>
                <ScrollView style={{height:290}}>
                    {
                        state.searchList.length === 0 ?
                            <View style={{ height: 150, justifyContent: "center", alignItems: "center" }}><Text>최근 검색한 내용이 없습니다.</Text></View>
                            :
                            <View style={{ ...styles.middelView, padding: 10 }}>
                                <Text style={styles.middleViewText}>최근검색</Text>
                                <TouchableWithoutFeedback onPress={() => handleDeleteAll()}><Text style={styles.middleViewText}>전체삭제</Text></TouchableWithoutFeedback>
                            </View>

                    }
                    {state.searchList.map((item, index) => (
                        <RecentSearch content={item} index={index} handleDelete={handleDeleteList} handleClick={handleClick} />
                    )
                    ).reverse()}
                </ScrollView>
        </View>
    );
}

export default Search;