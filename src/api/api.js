import axios from "axios";
const API_KEY = "21031c3b7b4a38cec4343b269656b52e";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchFromTMDB = async (endpoint, extraParams = {}) => {
  const response = await api.get(endpoint, {
    params: {
      api_key: API_KEY,
      ...extraParams,
    },
  });
  return response.data;
};
