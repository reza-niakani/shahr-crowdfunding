import Axios from 'comon/Axios/Axios';

const getAllFundsName = async (body) =>
  Axios.post('/Funds/GetAllTinyFunds', body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });

export default {
  getAllFundsName
};
