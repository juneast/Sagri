import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Hoshi } from 'react-native-textinput-effects';
import { Button } from 'native-base'
import axios from 'axios';

const styles = StyleSheet.create({
    inputText: {
        height: 50,
        width: 200,
        color: "black",
        fontSize: 5
    },
    Btn: {
        width: 100,
        backgroundColor: "#0178D4",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",

    },
    SignUpText: {
        color: "white"
    },
    inputWithBtn: {
        width: 300,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})


const EmailAuth = ({ complete }) => {
    const [email_token, setToken] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [process, setProcess] = React.useState(1);
    const sendEmail = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/user/mailcheck",
                method: 'post',
                data: {
                    email
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    const sendToken = async () => {
        try {
            const response = await axios({
                url: global.API_URI + "/api/user/mailtokencheck",
                method: 'post',
                data: {
                    email,
                    email_token
                }
            })
            if (response.status === 200) {
                alert("이메일 인증이 완료됐습니다.")
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View>
            {process === 1 ?
                <View style={styles.inputWithBtn}>
                    <Hoshi
                        label={'이메일'}
                        // this is used as active and passive border color
                        borderColor={'#CCCCCC'}
                        style={styles.inputText}
                        inputPadding={16}
                        labelHeight={10}
                        labelStyle={{ color: '#999999', fontSize: 15 }}
                        inputStyle={{ color: '#000000', fontSize: 15 }}
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                    />
                    <Button style={styles.Btn}
                        onPress={() => {
                            sendEmail();
                            setProcess(2)
                        }}>
                        <Text style={styles.SignUpText}>인증번호 전송</Text>
                    </Button>
                </View>
                :
                <View style={{width:300}}>
                    <Text>{`${email} 로 인증번호가 발송되었습니다.`}</Text>
                    <View style={styles.inputWithBtn}>

                        <Hoshi
                            label={'인증번호입력'}
                            defaultValue=""
                            style={styles.inputText}
                            borderColor={'#CCCCCC'}
                            labelHeight={24}
                            labelStyle={{ color: '#999999', fontSize: 15 }}
                            inputStyle={{ color: '#000000', fontSize: 15 }}
                            autoCapitalize="none"
                            onChangeText={text => setToken(text)}
                        />
                        <Button style={styles.Btn} onPress={() => {
                            sendToken();
                            complete();
                        }}>
                            <Text style={styles.SignUpText}>확인</Text>
                        </Button>
                    </View>
                </View>

            }



        </View>
    )

}


export default EmailAuth;