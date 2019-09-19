import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_STRAVA_API_URL
});

export const { getToken } = () => {
    api.get('')
};
