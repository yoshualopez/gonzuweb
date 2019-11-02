import ReactDOM from "react-dom";
import React from "react";
import SessionValidator from "./session";
import axios from "axios";
import conf from './Config';
import "./index.css"

axios.defaults.baseURL = conf.endpoint.local;

ReactDOM.render(<SessionValidator/>,document.getElementById("App"));
