import axios from "axios";
import React from "react";
import AppData from "../../config/appData.json";

export default function HandlePostApi(url, data) {
  let Url = AppData.BASE_URL + url;
  return new Promise((resolve, reject) => {
    axios(Url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson", responseJson);
        resolve(responseJson);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

// let Url = AppData.BASE_URL + url;
// axios
//   .post(Url, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   })
//   .then(function (response) {
//     return response;
//     // console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
