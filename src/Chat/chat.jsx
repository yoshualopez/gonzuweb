import React,{ Component } from 'react';
import socket from '../socket';

socket.on("replymessage",(data) =>{
  console.log("RECIVE MESSAGE => ",data)
});
class Chat extends Component{
  constructor(props){
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.inputMessage = React.createRef();
  }
  sendMessage(){
    const message = this.inputMessage.value;
    socket.emit("message",message);
  }
  render(){
    return(
      <div>
        <input ref={(e) => this.inputMessage = e} placeholder="webSocket message"/>
        <button onClick={this.sendMessage} type="button">Enviar</button>
      </div>
    );
  }
}
export default Chat;