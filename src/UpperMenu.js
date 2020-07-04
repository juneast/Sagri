import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Text, Button, Spinner } from 'native-base';
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

    state = {
        data: [],
        page: 1,
        isLoading: true,
        refreshing: false
    }

    sendPost = async () => {
        try {
            const data_ = await axios({
                url: global.API_URI + "/api/post",
                method: 'get',
                headers: {
                    'x-access-token': global.token
                }
            })
            //console.log(data_.body)
            //console.log(data_.data) // data에만 들어있었다
            this.setState({
                data: this.state.refreshing?data_:this.state.data.concat(data_.data),
                page: this.state.refreshing?1:this.state.page + 1,
                isLoading: false,
                refreshing: false
            });
        } catch (err) {
            console.log(err);
        }
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
        <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate({ name: 'Details', params: {item} })}>
            <PostCard key={index} title={item.title} content={item.content} author={item.author.userId} />
        </TouchableOpacity>
    );

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}><Spinner /></View>
        }
        return (

            <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item._id}
                //refreshing={this.state.refreshing}
                //onRefresh={this._handleRefresh}
            //onEndReached={this._handleLoadMore}
            //onEndReachedThreshold={0.1}
            />
        );
    }
}
