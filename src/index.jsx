import ReactDOM from "react-dom";
import React from "react";
import SessionValidator from "./session";
import axios from "axios";
import conf from './Config';
import "./index.css"
import style from './styles';

//PENDING TO ADD BOOSTRAP AND FIX AXIOS REQUEST OPTIONS NEED CHANGE TO POST
axios.defaults.baseURL = conf.endpoint.local;
//document.getElementsByTagName('body').item(0).style.background = style.background.PrimaryDark;

ReactDOM.render(<SessionValidator/>,document.getElementById("App"));