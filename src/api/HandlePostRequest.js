import axios from "axios";

export default function HandlePostApi(url, requestData) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
        console.log("response", response.data)
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
