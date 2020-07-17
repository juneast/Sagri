import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

export default class Chat extends Component {
    state = {
        email: "",
        password  : "",
    };

    changeEmail = (text) => {
        this.setState({ email : text });
    };
    
    changePassword = (text) => {
        this.setState({ password : text });
    };
     
    render(){
        return (
            <View style={styles.container}>
              <Text style={styles.title}>채팅방~</Text>
            </View>
          );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  title: {
      margin: 30,
      fontSize: 30,
      fontSize: 20,
      fontWeight: 'bold',
  },

  textinput:{
    width: 250,
    marginBottom: 10,
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1
}
});




/*import React from 'react'
import socketio from 'socket.io-client'
const socket = socketio.connect('http://54.180.167.12:3000/')

class ChatForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: '', message: ''}
    }

    nameChanged(e){
        this.setState({name: e.target.value})
    }

    messageChanged(e){
        this.setState({message: e.target.value})
    }

    send(){
        socket.emit('chat-msg',{
            name: this.state.name,
            message: this.state.message
        })
        this.setState({message:''})
    }
}

class ChatApp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            logs:[]
        }
    }

    componentDidMount(){
        socket.on('chat-msg',(obj)=>{
            const logs2 = this.state.logs
            obj.key = 'key_' + (this.state.logs.length +1)
            console.log(obj)
            logs2.unshift(obj)
            this.setState({logs:logs2})
        })
    }

    render(){
        const messages = this.state.logs.map(e=>(
            <div key ={e.key} style = {styles.log}>
                <span style={styles.name}>{e.name}</span>
                <span style={styles.msg}>{e.message}</span>
                <p style={{clear:'both'}}/>
            </div>
        ))
        return (
            <div>
                <h1 style={styles.h1}>실시간 채팅</h1>
                <ChatForm />
                <div>{messages}</div>
            </div>
        )
    }
}*/