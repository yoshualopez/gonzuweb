import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

export default class E404 extends Component{
  render(){
    return(
      <div>
        <p>Error 404!.</p>
        <Link to="/">Return hom</Link>
      </div>
    );
  }
}