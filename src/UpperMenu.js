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
                data: this.state.data.concat(data_.data),
                page: this.state.page + 1,
                isLoading: false
            });

        } catch (err) {
            console.log(err);
        }
    }

    _handleLoadMore = () => {
        this.sendPost();
    }

    componentDidMount() {
        this.sendPost();
    }



    _renderItem = ({ item, index }) => (
        <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('Details')}>
            <PostCard key={index} title={item.title} content={item.content} author={item.author.userId} />
        </TouchableOpacity>
        /*<View style={{borderBottomWidth:1, marginTop: 20, height:200}}>
          <Text>{item.title}</Text>
        </View>*/
        //onPress={()=>navigation.navigate("Details",{pageId : item})}
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
            //onEndReached={this._handleLoadMore}
            //onEndReachedThreshold={0.1}
            />
        );
    }
}

/*let Anot = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function UpperMenu({navigation}) {


    let abc = Anot.map((item, index) => {
        return <Button key={index} style={{ margin: 10, borderRadius: 10 }} ><Text key={index}>{item}</Text></Button>;
    });
    Anot = Anot.map((item, index) => {
        return (
            <TouchableOpacity key={index} onPress={()=>navigation.navigate("Details",{pageId : item})}><CardExample key={index}/></TouchableOpacity>
        )
    })
    return (
        <Container>
            <Tabs locked={true} renderTabBar={() => <ScrollableTab />}>
                <Tab heading="지역">
                    <ScrollView>
                        <ScrollView horizontal>{abc}</ScrollView>
                        {Anot}
                    </ScrollView>
                </Tab>
                <Tab heading="학교">
                </Tab>
                <Tab heading="등등">
                </Tab>
                <Tab heading="Tab4">
                </Tab>
                <Tab heading="Tab5">
                </Tab>
            </Tabs>
        </Container>
    );

}*/