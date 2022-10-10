import Axios from "axios";
import { Component } from "react";
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
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  }

  delete = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: 'DELETE',
      // data: model,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  }

  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: 'PUT',
      data: model,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
    })
  }
}
