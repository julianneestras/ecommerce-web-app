import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  // timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// instance
//   .get("/products")
//   .then((response) => {
//     console.log("all products:", response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log;
//   });

export default instance;
