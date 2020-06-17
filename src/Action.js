import React from 'react';
import { Image, View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Root,Button, ActionSheet, Text,Icon } from "native-base";


var BUTTONS = ["등록위치 선택", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const Action = () => {
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
                setButtonIndex(index)
              }
            )}
          >
            <Text style ={{lineHeight:50}}>{BUTTONS[buttonIndex]}</Text>
          </TouchableWithoutFeedback>
          </Root>
        
    );

}


export default Action;
