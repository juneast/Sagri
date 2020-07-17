import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { CustomButton, CustomInput } from '../../components/index'
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 50,
        paddingTop: 100,
    },
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
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    }
})


const EmailAuth = ({ navigation }) => {
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
                navigation.navigate("SignUp");
            }
        } catch (err) {
            alert("이메일 인증에 실패했습니다.")
            console.log(err);
        }
    }

    const handleButtonClick = () => {
        sendEmail();
        setProcess(2)
    }

    const handleComplete = () => {
        sendToken();
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignSelf: "flex-start", marginLeft: 20, alignItems: "center" }}>
                <View style={{ height: 30, width: 30, backgroundColor: "skyblue", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 20 }}>1</Text>
                </View>
                <View style={{ width: 20, height: 2, backgroundColor: "#ccc" }}></View>
                <View style={{ height: 30, width: 30, backgroundColor: "#ccc", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 20 }}>2</Text>
                </View>
            </View>
            <Text style={{ alignSelf: "flex-start", marginLeft: 20, color: "skyblue", fontSize: 20, marginTop: 20, marginBottom: 50 }}>이메일 인증</Text>
            {process === 1 ?
                <View style={{ width: "100%" }}>
                    <CustomInput label="이메일" onChangeText={setEmail} />
                    <CustomButton label="인증번호 전송" onPress={handleButtonClick} />
                </View>
                :
                <View style={{ width: "100%" }}>
                    <Text style={{ marginLeft: 20 }}>{`${email} 로 인증번호를 발송했습니다.`}</Text>
                    <CustomInput label="인증번호입력" onChangeText={setToken} />
                    <CustomButton label="확인" onPress={handleComplete} />
                </View>
            }
        </View>
    )
}


export default EmailAuth;