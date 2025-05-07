import request from "../utils/request.js";

export const getCategories = () => {
  return request({
    url: "/categories",
    method: "get",
  });
};

export const getProducts = () => {
  return request({
    url: "/products",
    method: "get",
  });
};
