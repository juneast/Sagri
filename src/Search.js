import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,TouchableOpacity,TextInput } from 'react-native';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
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
        alignItems:"center"
    },
    middleViewText: {
        color: "#aaa",
        fontSize: 13
    }
})

const RecentSearch = ({content,index,handleDelete}) => {
    return (
        <TouchableWithoutFeedback>
            <View style={{ ...styles.middelView, borderTopColor: "#ccc", borderTopWidth: StyleSheet.hairlineWidth }}>
                <Text>{content}</Text>
                <View style={{ flexDirection: "row",alignItems:"center"}}>
                    <Text style={{ color: "#ccc", fontSize: 13, marginRight: 20 }}>06.17</Text>
                    <TouchableOpacity style={{padding:10}} onPress={()=>handleDelete(index)}><Icon name="close" style={{ color: "#ccc", fontSize: 20 }} /></TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Search = ({ tagName, navigation }) => {
    const [searchList, setSearchList] = React.useState(["안녕","이라는","말을","해","짧은","시간을","뒤로한",'채로'])
    const [content, setContent] = React.useState("")
    const handleInsertList = ()=> {
        setSearchList([content].concat(searchList))
        setContent("");
    }
    const handleDeleteList = (index)=>{
        setSearchList(searchList.filter((item,ind)=>index!==ind));
    }
    const handleDeleteAll = ()=>{
        setSearchList([]);
    }
    return (
        <View style={styles.root}>
            <Header style={{ backgroundColor: "#fff", alignItems: "center", height: "auto", width: "auto" }}>
                <View style={styles.searchBar}>
                    <Icon name="ios-search" style={{ marginLeft: 10 }} />
                    <Input autoFocus={true} style={{fontSize:14}}value={content} placeholder="Search" placeholderTextColor="#ccc" onChange={(item)=>setContent(item.nativeEvent.text)} onSubmitEditing={()=>handleInsertList()}/>
                </View>
                <TouchableWithoutFeedback onPress={()=>setContent("")} ><Text style={{ marginRight: 10 }}>취소</Text></TouchableWithoutFeedback>
            </Header>
            <View>
                {searchList.length===0 ? 
                    <View style={{height:150, justifyContent:"center", alignItems:"center"}}><Text>최근 검색된 내용이 없습니다.</Text></View>
                    :
                    <View style={{...styles.middelView,padding:10}}>
                    <Text style={styles.middleViewText}>최근검색</Text>
                    <TouchableWithoutFeedback onPress={() => handleDeleteAll()}><Text style={styles.middleViewText}>전체삭제</Text></TouchableWithoutFeedback>
                    </View>

                }
                {searchList.map((item, index)=><RecentSearch content={item} index={index} handleDelete = {handleDeleteList}/>)}
                
            </View>
            
        </View>
    );
}

export default Search;