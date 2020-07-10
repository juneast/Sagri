import React from 'react';
import { Image, View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Root,Button, ActionSheet, Text,Icon } from "native-base";


var BUTTONS = ["등록위치 선택", "정치", "경제", "사회", "과학"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 0;

const Action = ({setTag}) => {
    const [buttonIndex, setButtonIndex] = React.useState(0);
    return (
            <Root>
            <TouchableWithoutFeedback
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
              },
              index => {
                setButtonIndex(index);
                if(index===0){
                  setTag("");
                }else {
                  setTag(BUTTONS[index]);
                }
              }
            )}
          >
            <Text style ={{lineHeight:50, textAlign:"center"}}>{BUTTONS[buttonIndex]}</Text>
          </TouchableWithoutFeedback>
          </Root>
        
    );

}


export default Action;
