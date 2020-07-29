import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const apiKey = '2b41b36d91e22810106321edb2989100';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

export { api, apiKey, imgUrl };
