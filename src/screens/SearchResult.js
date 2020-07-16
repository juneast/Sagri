import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Spinner ,ListItem} from 'native-base';
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

let flatRef = {};
const SearchResult = ({ tagName, navigation, route }) => {
    const [content, setContent] = React.useState(route.params.name)
    const [topButton, setTopButton] = React.useState(false)
    const [state, setState] = React.useState({
        data : [],
        isLoading : true,
        refreshing : true,
        changeNum : 0,
    });

    useEffect(() => {
        if(state.isLoading){
            searchPostRequest();
        }
        if(state.changeNum!==undefined && state.changeNum!==0){
            getPost();
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
                    changeNum : 0,
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

    const getPost = async () => {
        try {
            let response = await axios({
                url: `${global.API_URI}/api/post/${state.changeNum}`,
                method: 'get',
            })
            setState({ data: state.data.map((item, index) => item.postid == state.changeNum ? response.data : item), changeNum: 0 ,isLoading:false})
        } catch (err) {
            console.log(err);
        }
    }
    const handlePostChange = (num) => {
        if(num!==undefined) setState({data :state.data, changeNum :num, isLoading: false});
        else {
            setState({isLoading:true,changeNum:0,data:state.data})
        }
    }
    const handleInsertList = ()=> {
        setState({isLoading:true,changeNum:0,data:state.data})
        route.params.handleInsert(content)
    }
    return (
        <View style={styles.root}>
            <Header style={{ backgroundColor: "#fff", alignItems: "center", height: "auto", width: "auto" }}>
                <View style={styles.searchBar}>
                    <Icon name="ios-search" style={{ marginLeft: 10 }} />
                    <Input style={{fontSize:14}}value={content} placeholder="Search" placeholderTextColor="#ccc" onChange={(item)=>setContent(item.nativeEvent.text)} onSubmitEditing={()=>handleInsertList()}/>
                </View>
                <TouchableWithoutFeedback onPress={()=>navigation.goBack()} ><Text style={{ marginRight: 10 }}>취소</Text></TouchableWithoutFeedback>
            </Header>
            {state.isLoading ? 
                <View style={{height:"100%",alignItems: "center", justifyContent: "center" }}><Spinner /></View>
                :
                <View>
                    
                <ScrollView style={{marginBottom:110}}>
                    <View style={{borderTopWidth:StyleSheet.hairlineWidth, backgroundColor:"#fff",marginBottom:10,paddingLeft:20, padding:10}}><Text >{`검색결과 : ${state.data.length}`}</Text></View>
                    {state.data.map((item,index)=>(
                        <ListItem key={index}
                        rippleSequential
                            noIndent
                            style={{padding:0, backgroundColor:"#fff",width:"100%",margin:0}}
                            onPress={() => {
                
                                navigation.navigate({ name: 'Details', params: { item, handlePostChange: handlePostChange } })
                            }}>
                            <PostCard key={index} post={item}/>
                        </ListItem>
                
                    )
                        
                    )}
                </ScrollView>
                </View>
     
      
            
            }
            
            
        </View>
    );
}

export default SearchResult;