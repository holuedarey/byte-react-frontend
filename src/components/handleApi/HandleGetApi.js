import AppData from "../../config/appData.json";
import axios from "axios";
import httpClient from "../../helpers/RequestInterceptor";

export default function HandlePostApi(url, setStateFunc) {
  httpClient.get(AppData.BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setStateFunc(response.data.data.data || response.data.data);
      console.log(response.data.data.data)
    })
    .catch(function (error) {
      console.log(error);
  });
}
