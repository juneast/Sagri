import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Text,Button } from 'native-base';
import CardExample from './Comp'

let Anot = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function UpperMenu() {
    let abc = Anot.map((item, index) => {
        return <Button style={{margin:10, borderRadius:10}}><Text>{item}</Text></Button>;
    });
    Anot = Anot.map((item, index) => {
        return <CardExample key={index} item={item} />
    })
    return (
        <Container>
            
            
            <Tabs locked={true} renderTabBar={() => <ScrollableTab />}>
                <Tab  heading="지역">
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

}