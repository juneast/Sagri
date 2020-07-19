// import React, { Component } from 'react';
// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import LoginNavigator from './src/navigators/LoginNavigator'
// import { Root } from 'native-base'
// import './global'

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isReady: false,
//     };
//   }

//   async componentDidMount() {
//     await Font.loadAsync({
//       Roboto: require('native-base/Fonts/Roboto.ttf'),
//       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
//       ...Ionicons.font,
//     });
//     this.setState({ isReady: true });
//   }

//   render() {
//     if (!this.state.isReady) {
//       return <AppLoading />;
//     }

//     return (
//         <LoginNavigator />
//     );
//   }
// }
import React, { Component, useState, useEffect, useRef } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root, Spinner } from 'native-base'
import { TouchableOpacity,View} from 'react-native'
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
const CameraScreen = () => {
  const [hasAllow, setHasAllow] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const takePhoto = async () => {
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      //navigate("UpLoad", { photo: asset });
    } catch (error) {
      console.log(error);
    }
  };
  const requestPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasAllow(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    loading ?
      <Spinner />
      :
      <View style={{height:"100%", justifyContent:"center", alignItems:"center"}}>
        <Camera
        type={cameraType}
          ref={cameraRef}
          style={{height:"70%", width:"100%"}}>
          <TouchableOpacity onPress={toggleCameraType} >
            <Ionicons
              name={
                "md-reverse-camera"
              }
              color="white"
              size={28}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
        </Camera>
        <View>
          <TouchableOpacity onPress={takePhoto} style={{marginTop:20,height:40, width:40, borderRadius:20, borderWidth:1}}>
          
          </TouchableOpacity>
        </View>
      </View>


  );
}

export default CameraScreen;