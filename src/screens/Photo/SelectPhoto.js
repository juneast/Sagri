import React, { useState, useEffect } from "react";

import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity, Image, ScrollView, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import { Spinner, Toast, Root, Icon } from 'native-base'
import constants from "../../constants";
import {ListHeaderPhoto} from '../../components/index'
import { Constants } from "expo-camera";
const SelectPhoto = ({ navigation,route }) => {
    const {handleClickButton} = route.params;
    const [hasAllow, setHasAllow] = useState(false);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(0);
    const [renderPart, setRenderPart] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(0)
    const getAlbums = async () => {
        try {
            const albums = await MediaLibrary.getAlbumsAsync();
            let abc = [];
            let allAssets = [];
            for (let i = 0; i < albums.length; i++) {
                const { assets } = await MediaLibrary.getAssetsAsync({ album: albums[i], first: albums[i].assetCount })
                if (assets.length === 0) continue;
                else {
                    allAssets = allAssets.concat(assets);
                }
                abc.push({
                    album: albums[i].title,
                    photos: assets
                })
            }
            abc = [{
                album: "전체보기",
                photos: allAssets
            }].concat(abc);
            setAlbums(abc);
            setRenderPart(allAssets.slice(0, allAssets.length > 50 ? 50 : allAssets.length))
            setPage(1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //접근 권한 요청 함수
    const requestPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // console.log(status);
            if (status === "granted") {
                setHasAllow(true);
                getAlbums();
            }
        } catch (error) {
            console.log(error);
            setHasAllow(false);
        }
    };

    // 선택된 사진 변경해주는 함수
    const changeSelected = photo => {
        if (selected.indexOf(photo) === -1) {
            if(selected.length>4){
                Toast.show({
                    text: "최대 5개까지 등록 가능합니다.",
                    position: "bottom",
                    style: { width: "70%", bottom: '30%', backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 25, alignSelf: "center" },
                    textStyle: { textAlign: "center" }
                })
                return null;
            }
            setSelected(selected.concat([photo]))
        } else {
            setSelected(selected.filter((item) => item !== photo))
        }

    };
    const handleListHeader = (item) => {
        setSelectedAlbum(item);
        const { photos } = albums[item];
        setRenderPart(photos.slice(0, photos.length > 50 ? 50 : photos.length))
        setPage(1);
    }
    const _handleLoadMore = () => {
        const { photos } = albums[selectedAlbum];
        if (renderPart.length >= photos.length) return null;
        setRenderPart(photos.slice(0, photos.length > (page + 1) * 50 ? (page + 1) * 50 : photos.length))
        setPage(page + 1)
    }
    useEffect(() => {
        if (loading) {
            requestPermission();
        }
    });
    const _renderItem = ({ item, index }) => {
        const selectedIndex = selected.indexOf(item);
        return (
            
            <TouchableWithoutFeedback
                key={item.id}
                onPress={() => changeSelected(item)}
            >
                <View>
                    <Image
                        style={{
                            width: (constants.width / 3) - (StyleSheet.hairlineWidth * 2),
                            height: constants.width / 3,
                            margin: StyleSheet.hairlineWidth
                        }}
                        source={{ uri: item.uri }}
                    />

                    <View style={{
                        position: "absolute",
                        right: 5, top: 5,
                        height: 26, width: 26,
                        borderRadius: 13, borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "white",
                        backgroundColor: selectedIndex !== -1 ? "red" : "rgba(0,0,0,0.3)",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{ color: "white" ,fontWeight:"bold"}}>{selectedIndex !== -1 ? selectedIndex+1 : ""}</Text>
                    </View>
                </View>

            </TouchableWithoutFeedback>

        )
    }
    const _renderItemHorizontal = ({ item, index }) => {
        return (
            
            <TouchableWithoutFeedback
                key={item.id}
                onPress={() => changeSelected(item)}
            >
                <View>
                    <Image
                        style={{
                            width: (constants.width / 6) - (StyleSheet.hairlineWidth * 2),
                            height: constants.width / 6,
                            margin:constants.width / 60,
                        }}
                        source={{ uri: item.uri }}
                    />

                    <View style={{
                        position: "absolute",
                        right: 5, top: 5,
                        height: 16, width: 16,
                        borderRadius: 8, borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "white",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        justifyContent: "center",
                        alignItems: "center",
                        
                    }}>
                        <Icon name="close" style={{fontSize:16,color:"white"}}/>
                    </View>
                </View>

            </TouchableWithoutFeedback>

        )
    }
    const handleClick = ()=>{
        handleClickButton(selected);
        navigation.goBack();
    }
    return (
        <View>
            {loading ? (
                <Spinner />
            ) : hasAllow ? (
                <>
                    <ListHeaderPhoto albums={albums} handleListHeader={handleListHeader} />
                    <TouchableOpacity
                        onPress={() => handleClick()}
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            top: 5,
                            right: 5,
                            padding: 10,
                        }}
                    >
                        <Text>{`${selected.length===0?"":selected.length} 선택`}</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={selected}
                        renderItem={_renderItemHorizontal}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={refreshing}
                        horizontal={true}
                        style={{
                            backgroundColor:"white"
                        }}
                    />
                    <FlatList
                        data={renderPart}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={refreshing}
                        style={{ height: selected.length===0?constants.height : constants.height-constants.width/5 }}
                        numColumns={3}
                        horizontal={false}
                        refreshing={refreshing}
                        onEndReached={_handleLoadMore}
                        onEndReachedThreshold={0.1}
                    />
                </>
            ) : (
                        <Text>bad</Text>
                    )}
        </View>
    );
};

export default SelectPhoto;