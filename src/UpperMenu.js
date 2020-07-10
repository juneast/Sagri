import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Text, Button, Spinner ,Header} from 'native-base';
import PostCard from './PostCard'
import HomeTab from './HomeTab'
import SearchTab from './SearchTab'
import axios from 'axios'
import {
    View,
    Image,
    FlatList, // here
} from 'react-native';

/*import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'; 

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: { screen: HomeTab },
    SearchTab: { screen: SearchTab }
  });

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class UpperMenu extends React.Component({navigation}){
    render() {
        return <AppTabContainet/>;
    }
}*/

export default class UpperMenu extends React.Component {
    constructor(props) {
        super(props);
        // this.props.navigation.addListener('focus', () => {
        //     this.setState({ isLoading: true, refreshing: true })
        //     console.log("focused");
        //     this.sendPost()
        // });
        this.state = {
            data: [],
            page: 1,
            isLoading: true,
            refreshing: false,
            toTopButtonAvailable : false
        }
    }

    sendPost = async (tagName) => {
        try {
            let url=undefined;
            if(this.props.route.params){
                url = this.props.route.params.url
            }
            if(!url) {
                url = `${global.API_URI}/api/post`
            }
            let data_ = await axios({
                url,
                method: 'get',
                headers: {
                    'x-access-token': global.token
                }
            })
            //console.log(data_.body)
            //console.log(data_.data) // data에만 들어있었다
            this.setState({
                data: this.state.refreshing ? data_.data : this.state.data.concat(data_.data),
                page: this.state.refreshing ? 1 : this.state.page + 1,
                isLoading: false,
                refreshing: false
            });
        } catch (err) {
            console.log(err);
        }
    }
    handleTagClick = (tagName) => {
        if(tagName==="싸그리"){
            return null;
        }
        const url = `${global.API_URI}/api/post?tag=${tagName}`
        this.props.navigation.push('Home',{ url } )
    }
    _handleLoadMore = () => {
        this.sendPost();
    }

    _handleRefresh = () => {
        this.sendPost();
    }

    componentDidMount() {
        this.sendPost();
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate({ name: 'Details', params: { item } })}>
            <PostCard key={index} post={item} handleTagClick = {this.handleTagClick} />
        </TouchableOpacity>
    );
    handleScroll = (item) =>{
        if(item.nativeEvent.contentOffset.y!==0 && !this.state.toTopButtonAvailable){
            this.setState({toTopButtonAvailable:true})
        }
        if(item.nativeEvent.contentOffset.y===0){
            this.setState({toTopButtonAvailable:false})
        }
    }
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
        }
        return (
            <Container>

            
            <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                style={{backgroundColor:"#eee"}}
                data={this.state.data}
                onScroll={this.handleScroll}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state.refreshing}
                ListHeaderComponent={<Header style={{backgroundColor:"#fff", height:40, borderBottomWidth:StyleSheet.hairlineWidth}}/>}
            //refreshing={this.state.refreshing}
            //onRefresh={this._handleRefresh}
            //onEndReached={this._handleLoadMore}
            //onEndReachedThreshold={0.1}
            />
            {
                this.state.toTopButtonAvailable ? 
                    <TouchableOpacity 
                        onPress={()=>this.flatListRef.scrollToOffset({ animated: true, offset: 0 }) }
                        style={{position:"absolute", bottom:20,right:20, backgroundColor:"rgba(0,0,0,0.2)", padding:5,borderRadius:3}}>
                        <Text>Top</Text>
                    </TouchableOpacity>
                    :
                    null                
            }
            </Container>
        );
    }
}
