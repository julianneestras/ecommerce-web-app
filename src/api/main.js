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

export const getProductsBySlug = (slug) => {
  return request({
    url: `/products/slug/${slug}`,
    method: "get",
  });
};

export const getCategoryBySlug = (slug) => {
  return request({
    url: `/categories/slug/${slug}`,
    method: "get",
  });
};

export const getProductsByCategory = (categoryId) => {
  return request({
    url: `/categories/${categoryId}/products`,
    method: "get",
  });
};
