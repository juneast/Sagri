import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native'
import { Header } from 'native-base'
import axios from 'axios';

const styles = StyleSheet.create({

})


const ListHeaderPhoto = ({ handleListHeader, albums}) => {
    const [selectedValue, setSelectedValue] = React.useState();
    return (
        <Header style={{ backgroundColor: "#fff", height: 50, borderBottomWidth: StyleSheet.hairlineWidth, alignItems:"center",justifyContent:"flex-start"}}>
            <Picker
                selectedValue={selectedValue}
                style={{height:50,width: 150}}
                onValueChange={(itemValue, itemIndex) => {
                    handleListHeader(itemValue)
                    setSelectedValue(itemValue)
                }}
                mode="dropdown"
            >
                {albums.map((item, index)=>{
                    return <Picker.Item label={`${item.album}(${item.photos.length})`} value={index} key={index} />
                })}
            </Picker>
        </Header>
    )

}

export default ListHeaderPhoto;