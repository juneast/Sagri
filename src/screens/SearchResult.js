import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Spinner } from 'native-base';
import axios from 'axios'
import PostCard from '../PostCard'
const styles = StyleSheet.create({
    root: {
        
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
let flatRef = {};
const SearchResult = ({ tagName, navigation, route }) => {
    
    const [content, setContent] = React.useState(route.params.name)
    const [topButton, setTopButton] = React.useState(false)
    const [state, setState] = React.useState({
        data : [],
        isLoading : true,
        refreshing : true,
    });

    useEffect(() => {
        if(state.isLoading){
            searchPostRequest();
        }

    });

    const searchPostRequest = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/search?string=" + content,
                method: 'get',

            })
            if (response.status === 200) {
                setState({
                    isLoading : false,
                    data : response.data,
                    refreshing: false,
                })
            }
        } catch (err) {
            alert("조회에 실패했습니다!")
            console.log(err);
        }
    }
    const handleScroll = (item) => {
        if (item.nativeEvent.contentOffset.y !== 0 && !this.state.toTopButtonAvailable) {
            setTopButton(true)
        }
        if (item.nativeEvent.contentOffset.y === 0) {
            setTopButton(false)
        }
    }
    const _renderItem = ({ item, index }) => (
        <TouchableOpacity key={index} >
        <Text style={{height:100}}>왜안돼씨발아</Text>
            <PostCard key={index} post={item}/>
        </TouchableOpacity>
    )

        

    const handleInsertList = ()=> {
        setState({isLoading:true})
        route.params.handleInsert(content)
    }
    return (
        <View style={styles.root}>
            <Header style={{ backgroundColor: "#fff", alignItems: "center", height: "auto", width: "auto" }}>
                <View style={styles.searchBar}>
                    <Icon name="ios-search" style={{ marginLeft: 10 }} />
                    <Input style={{fontSize:14}}value={content} placeholder="Search" placeholderTextColor="#ccc" onChange={(item)=>setContent(item.nativeEvent.text)} onSubmitEditing={()=>handleInsertList()}/>
                </View>
                <TouchableWithoutFeedback onPress={()=>setContent("")} ><Text style={{ marginRight: 10 }}>취소</Text></TouchableWithoutFeedback>
            </Header>
            {state.isLoading ? 
                <View style={{height:"100%",alignItems: "center", justifyContent: "center" }}><Spinner /></View>
                :
                <View>
                    
                <ScrollView style={{marginBottom:110}}>
                    <View style={{borderTopWidth:StyleSheet.hairlineWidth, backgroundColor:"#fff",marginBottom:10,paddingLeft:20, padding:10}}><Text >{`검색결과 : ${state.data.length}`}</Text></View>
                    {state.data.map((item,index)=>(
                        <TouchableOpacity key={index} >
                            <PostCard key={index} post={item}/>
                        </TouchableOpacity>
                    )
                        
                    )}
                </ScrollView>
                </View>
     
      
            
            }
            
            
        </View>
    );
}

export default SearchResult;