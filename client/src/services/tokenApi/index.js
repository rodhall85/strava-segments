import axios from 'axios';

export const getToken = (code) => {
  const tokenApiUrl = process.env.REACT_APP_TOKEN_API_URL;

  return axios.get(`${tokenApiUrl}/getToken?authorisationCode=${code}`);
};
