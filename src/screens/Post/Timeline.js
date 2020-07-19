import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, RefreshControl, Picker, View, FlatList } from 'react-native';
import { Container, Text, Spinner} from 'native-base';
import { PostCard,ListHeader } from '../../components/index'
import axios from 'axios'

export default class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigation.addListener('focus', () => {
            if (this.state.changeNum === 0) {

            } else if (this.state.changeNum === -1) {
                this.setState({ isLoading: true, refreshing: true, changeNum: 0 })
                console.log("focused");
                this.sendPost()
            } else {
                this.getPost();
            }

        });
        this.state = {
            data: [],
            page: 1,
            selectedValue: "createTime",
            isLoading: true,
            refreshing: false,
            toTopButtonAvailable: false,
            changeNum: 0,
            isMore: true,
            moreLoading: false,

        }
    }
    getPost = async () => {
        try {
            let response = await axios({
                url: `${global.API_URI}/api/post/${this.state.changeNum}`,
                method: 'get',
            })
            this.setState({ data: this.state.data.map((item, index) => item.postid == this.state.changeNum ? response.data : item), changeNum: 0 })
        } catch (err) {
            console.log(err);
        }
    }
    sendPost = async () => {
        const { params } = this.props.route;
        try {
            let url = params ? params.url + "&" : `${global.API_URI}/api/post?`;
            let data_ = await axios({
                url: url + `type=${this.state.selectedValue}`,
                method: 'get',
            })
            this.setState({
                data: this.state.refreshing ? data_.data : this.state.data.concat(data_.data),
                page: this.state.refreshing ? 1 : this.state.page + 1,
                isLoading: false,
                refreshing: false,
                isMore: data_.data.length === 0 ? false : true
            });
        } catch (err) {
            console.log(err);
        }
    }
    handlePostChange = (num) => {
        if (num === undefined) this.setState({ changeNum: -1 });
        else this.setState({ changeNum: num });

    }
    handleTagClick = (tagName) => {
        if (tagName === "싸그리") {
            return null;
        }
        const url = `${global.API_URI}/api/post?tag=${tagName}`
        this.props.navigation.push('Timeline', { url })
    }
    _handleLoadMore = async () => {
        if (!this.state.isMore || this.state.moreLoading) return null;
        const { data, selectedValue } = this.state;
        const { params } = this.props.route;
        this.setState({ moreLoading: true })
        try {
            let url = params ? params.url : `${global.API_URI}/api/post`;
            let data_ = await axios({
                url: `${url}?last=${selectedValue === "createTime" ? data[data.length - 1].postid : this.state.page}&type=${selectedValue}`,
                method: 'get',
            })
            this.setState({
                data: this.state.refreshing ? data_.data : this.state.data.concat(data_.data),
                page: this.state.refreshing ? 1 : this.state.page + 1,
                isLoading: false,
                refreshing: false,
                isMore: data_.data.length === 0 ? false : true,
                moreLoading: false,
            });
        } catch (err) {
            console.log(err);
        }
    }

    _handleRefresh = () => {
        this.setState({ refreshing: true });
        this.sendPost();
    }
    handleListHeader = (item) => {
        this.setState({ refreshing: true, selectedValue: item }, () => {
            this.sendPost();
        });

    }
    componentDidMount() {
        if (this.state.isLoading) {
            this.sendPost();
        }
    }

    _renderItem = ({ item, index }) => (
        <PostCard key={index} post={item} handleTagClick={this.handleTagClick} navigation={this.props.navigation} handlePostChange={this.handlePostChange} />
    );
    handleScroll = (item) => {
        if (item.nativeEvent.contentOffset.y !== 0 && !this.state.toTopButtonAvailable) {
            this.setState({ toTopButtonAvailable: true })
        }
        if (item.nativeEvent.contentOffset.y === 0) {
            this.setState({ toTopButtonAvailable: false })
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
                    style={{ backgroundColor: "#eee" }}
                    data={this.state.data}
                    onScroll={this.handleScroll}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.refreshing}
                    ListHeaderComponent={<ListHeader listValue={this.state.selectedValue} handleListHeader={this.handleListHeader} />}
                    ListFooterComponent={this.state.isMore ? <Spinner /> : <View style={{ alignItems: "center", backgroundColor: "white" }}><Text style={{ padding: 10 }}>마지막입니다</Text></View>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                        />
                    }
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
                {
                    this.state.toTopButtonAvailable ?
                        <TouchableOpacity info bordered small
                            onPress={() => this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}
                            style={{ position: "absolute", bottom: 50, right: 20, borderWidth: 1,padding:5, borderColor: "skyblue", borderRadius: 10 }}>
                            <Text style={{ color: "skyblue" }}>Top</Text>
                        </TouchableOpacity>
                        :
                        null
                }
            </Container>
        );
    }
}
