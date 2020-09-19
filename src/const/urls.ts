export const LOCAL = "http://localhost:3000/";
export const ROOT = "/";

const urls = {
  home: ROOT,
  auth: {
    root: `${ROOT}auth`,
    login: `${ROOT}auth/login`,
    register: `${ROOT}auth/register`,
    resetpassword: `${ROOT}auth/resetpassword`,
    changepassword: `${ROOT}auth/changepassword`,
  },
  shop: {
    root: `${ROOT}shop`,
    products: `${ROOT}shop/browse`,
    product: `${ROOT}shop/:productId`,
  },
  admin: {
    dashboard: `${ROOT}admin`,
    addproduct: `${ROOT}admin/addproduct`,
  },
};

export default urls;
