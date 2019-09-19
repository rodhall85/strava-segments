import axios from 'axios';

export const getToken = async (code) => {
    const tokenApiUrl = process.env.REACT_APP_TOKEN_API_URL;

    return await axios.get(`https://bypasscors.herokuapp.com/api/?url=${tokenApiUrl}/getToken?authorisationCode=${code}`);
};