import React,{ Component } from 'react';
import socket from '../socket';
import templates from '../templates';

// socket.on("message",(data) =>{
//   console.log("RECIVE MESSAGE => ",data)
// });
class Chat extends Component{
  constructor(props){
    super(props);
    this.inputMessage = React.createRef();
  }
  sendMessage(){
    const message = this.inputMessage.value;
    socket.emit("message",message);
  }
  render(){
    return <templates.Construction/>;
  }
}
export default Chat;