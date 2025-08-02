import axios from 'axios';
import { handleError } from './helper';

const baseURL = 'http://localhost:3000/categories/';

export const categoryApi = {
  getCategory: handleError(async id => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getCategories: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteCategory: handleError(async id => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createCategory: handleError(async payload => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateCategory: handleError(async payload => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  })
};
