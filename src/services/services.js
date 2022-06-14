import axios from 'axios'

const apiUrl = 'https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes';

const apiServices = {

  getProducts: async () => {
    try {
      const res = await axios.get(apiUrl + '/products');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  getProductById: async (productId) => {
    try {
      const res = await axios.get(apiUrl + `/products/${productId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  saveProduct: async (product) => {
    try {
      const res = await axios.post(apiUrl + '/products', product);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateProduct: async (product) => {
    try {
      const res = await axios.put(apiUrl +  `/products/${product.id}`, product);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(apiUrl + `/products/${productId}`);
    } catch (error) {
      console.error(error);
    }
  },

  getUsers: async () => {
    try {
      const response =await axios.get(apiUrl + '/users');
      return response.data
    } catch (error) {
      console.error(error);
    }
  },

  saveUser: async (user) => {
    try {
      const res = await axios.post(apiUrl + '/users', user);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  getOrders: async (userId) => {
    try {
      const res = await axios.get(apiUrl + `/users/${userId}/orders`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  saveOrder: async (order) => {
    try {
      const res = await axios.post(apiUrl + `/users/${order.userId}/orders`, order);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
}

export default apiServices