import React, { Component } from 'react';
import {ScrollView ,TouchableOpacity} from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Text, Button } from 'native-base';
import CardExample from './Comp'
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
      page: 1 
    }
  
    sendPost = async ()=>{
        try{
            const data_ = await axios({ 
                url: "http://54.180.167.12:5000/api/post",
                method:'get',
                headers : {
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQzOWRkYTI5MWVmMTU3NzBkZWFkNDUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTkzMDUzMTgyLCJleHAiOjE1OTM2NTc5ODIsImlzcyI6IkxESiIsInN1YiI6InVzZXJJbmZvIn0.Ojtc_As3BA3HO1_cdKLTh7svEW9BntliR611pbdg7Uc',
                }
            })
            //console.log(data_.body)
            //console.log(data_.data) // data에만 들어있었다
            this.setState({ 
                data: this.state.data.concat(data_.data),
                page: this.state.page + 1
              });
            
        }catch(err){
            console.log(err);
        }
    }

    _handleLoadMore = () => {
        this.sendPost();
    }

    componentDidMount() {
      this.sendPost();
    }


  
    _renderItem = ({item,index}) => (
     <TouchableOpacity key={index} ><CardExample key={index} title = {item.title} content = {item.content} author ={item.author.userId}/></TouchableOpacity>
      /*<View style={{borderBottomWidth:1, marginTop: 20, height:200}}>
        <Text>{item.title}</Text>
      </View>*/
      //onPress={()=>navigation.navigate("Details",{pageId : item})}
    );
  
    render() {
        return (
            
          <FlatList 
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item._id}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={0.1}
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