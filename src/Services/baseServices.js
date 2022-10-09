import Axios from "axios";
import React, { Component } from "react";
import { DOMAIN, TOKEN } from "../utils/constain/setting";

export class baseServices extends Component {
  get = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  }

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: 'POST',
      data: model,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
    })
  }
}
