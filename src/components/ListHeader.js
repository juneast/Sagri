import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native'
import { Header } from 'native-base'
import axios from 'axios';

const styles = StyleSheet.create({

})


const ListHeader = ({ handleListHeader }) => {
    const [selectedValue, setSelectedValue] = React.useState("createTime");
    return (
        <Header style={{ backgroundColor: "#fff", height: 40, borderBottomWidth: StyleSheet.hairlineWidth, alignItems:"flex-end",justifyContent:"flex-end"}}>
            <Picker
                selectedValue={selectedValue}
                style={{height:40,width: 120}}
                onValueChange={(itemValue, itemIndex) => {
                    handleListHeader(itemValue)
                    setSelectedValue(itemValue)
                }}
                mode="dropdown"
            >
                <Picker.Item label="최신순" value="createTime" />
                <Picker.Item label="조회수" value="views" />
                <Picker.Item label="인기순" value="like" />
                <Picker.Item label="댓글순" value="comments" />
            </Picker>
        </Header>
    )

}


export default ListHeader;