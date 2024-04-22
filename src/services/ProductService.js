import axios from "axios"

const BASE_URL = process.env.API_URL;

const ProductServiceApi = {

  GetProductList: async() => {
    try{
      const response = await axios.get(`http://localhost:3001/api/v1/products`);
      return response.data;
    } catch(err){
      console.log('Error fecting product', err);
      throw err;
    }
  },

  CreateProduct: async (productData) => {
    try{
      const response = await axios.post(`http://localhost:3001/api/v1/products`, productData);
      return response.data;
    }
    catch(err){
      console.log('Error create product', err);
      throw err;
    }
  },

  DeleteProduct: async (productId) => {
    console.log(productId);
    try{
      const response = await axios.delete(`http://localhost:3001/api/v1/products/${productId}`);
      return response.data;
    } catch(err){
      throw err;
    }
  }
}


export default ProductServiceApi;