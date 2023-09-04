import AppData from "../../config/appData.json";
import axios from "axios";

export default function PostData(url, data) {
  let Url = AppData.BASE_URL + url;
  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson", responseJson);
        responseJson?.data?.token &&
          localStorage.setItem("token", responseJson.data.token);
        responseJson?.data?.token &&
          localStorage.setItem("user", JSON.stringify(responseJson.data.user));

        resolve(responseJson);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
