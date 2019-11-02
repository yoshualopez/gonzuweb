import React,{ Component } from 'react';
export default class App extends Component{
  render(){
    const {user} = this.props;

    return(
      <div className="container my-5">
        {user.gender === "M" ? <p>Bienvenido, {user.fullname}</p> : <p>Bienvenida, {user.fullname}</p>}
        {user.permissions.map(listPermission)}
      </div>
    );
  }
};
function listPermission(permission,key){
  return <p key={key}>{permission}</p>
}
