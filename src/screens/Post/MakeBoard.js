import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Header, Icon } from 'native-base'
import axios from 'axios'
import { Action } from '../../components/index'
import constants from '../../constants'
const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        height: constants.height,
        width: "100%",
        padding: 10,
    },
    title: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 15
    },
    header: {
        marginBottom: 5,
        height: 60,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 3, height: 3 },
        elevation: 3,
    }
})
const MakeBoard = ({ route, navigation }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [photos, setPhotos] = React.useState([]);
    const sendPost = async () => {
        try {
            let data = new FormData();
            data.append('title', "" + title);
            data.append('content', "" + content);
            data.append('tag', "" + tag);
            for(let i=0; i<photos.length ;i++){
                const path = Platform.OS === 'android' ? photos[i].uri : photos[i].uri.replace('file://', '');
                data.append('photos',{
                    name: photos[i].filename,
                    type: "image/jpeg",
                    uri:path
                })
            }
            const response = await axios({
                url: global.API_URI + "/api/post",
                method: 'post',
                headers : {
                    "Content-type" : "multipart/form-data"
                },
                data
            })
            if (response.status === 200) {
                //route.params.onMake();
                setTitle("");
                setContent("");
                setTag('');
                setPhotos([]);
                navigation.goBack(null);
            } else {
                alert("실패")
            }

        } catch (err) {
            console.log(err);
        }
    }
    const handleClickButton = (item) => {
        setPhotos(item);
    }
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <Header style={styles.header}>
                <Action setTag={setTag} />
                <TouchableOpacity style={{ position: "absolute", right: 10, padding: 10 }} disabled={title === "" || content === "" || tag === "" ? true : false} onPress={() => sendPost()}>
                    <Text style={{ color: title === "" || content === "" || tag === "" ? "#ccc" : "black" }}>등록</Text>
                </TouchableOpacity>
            </Header>
            <ScrollView style={styles.root}>

                <TextInput
                    style={styles.title}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder="제목을 입력하세요"
                />
                <TextInput multiline placeholder="내용을 입력하세요"
                    style={{ borderColor: 'gray', lineHeight: 35, padding: 5 }}
                    onChangeText={text => setContent(text)}
                    value={content}
                />
                {photos.map((item, index) => {
                    const margin = constants.width / 10;
                    return (
                        <TouchableWithoutFeedback
                            key={item.id}
                        //onPress={() => changeSelected(item)}
                        >
                            <View style={{ alignItems: "center", marginTop: 15, marginBottom: 15 }}>
                                <Image
                                    style={{
                                        width: (constants.width) - margin,
                                        height: constants.width,
                                        borderRadius: 5
                                    }}
                                    source={{ uri: item.uri }}
                                />
                            </View>

                        </TouchableWithoutFeedback>
                    )
                })}

            </ScrollView>
            <TouchableOpacity
                style={{ height: 50, width: 50, position: "absolute", bottom: 30, right: 20, backgroundColor: "skyblue", justifyContent: "center", alignItems: "center", borderRadius: 25 }}
                onPress={() => navigation.navigate({ name: 'SelectPhoto', params: { handleClickButton } })}
            >
                <Icon name="image" style={{ margin: 10, color: "white" }}></Icon>
            </TouchableOpacity>
        </View>

    );
}


export default MakeBoard;