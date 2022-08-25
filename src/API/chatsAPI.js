import axios from 'axios';

const url = 'https://api.chucknorris.io';

export const getJoke = () => {
    return axios.get(url + '/jokes/random');
};
