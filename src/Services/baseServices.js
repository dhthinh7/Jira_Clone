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
      headers: { 'Authorization': 'Bearer ' + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZHRoaW5oN0BnbWFpbC5jb20iLCJuYmYiOjE2NjQ5MjExODksImV4cCI6MTY2NDkyNDc4OX0.zYo4WHpxTSs6UwgZzc5RA6-HdQWt60tGvyAO-dvcSPc" }
    })
  }
}
