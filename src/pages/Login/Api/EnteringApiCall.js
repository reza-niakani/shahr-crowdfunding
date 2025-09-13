/* eslint-disable no-unused-vars */
import Axios from 'comon/Axios/Axios';

export const CheckUserNameReq = async (body) =>
  await Axios.post('/Accounts/CheckUsername', body)
    .then((res) => res?.data)
    .catch((er) => false);

export const LoginReq = async (body) =>
  await Axios.post('/Accounts/Login', body)
    .then((res) => ({
      status: 200,
      data: res?.data
    }))
    .catch((er) => ({
      status: 400,
      data: er?.response?.data?.title
    }));

export const CheckIsSejamiReq = async (nCode) =>
  await Axios.post(`/Accounts/SejamStatus?nationalId=${nCode}`, {})
    .then((res) => res)
    .catch((er) => false);

export const SendOtpSejamReq = async (body) =>
  await Axios.post('/Accounts/CreateSejamOtp', body)
    .then((res) => res)
    .catch((er) => false);

export const SendOtpForgetPasswordReq = async (body) =>
  await Axios.post('/Accounts/CreateOTP', body)
    .then((res) => res)
    .catch((er) => false);

export const ForgetPasswordSetReq = async (body) =>
  await Axios.post('/Accounts/ForgotPassword', body)
    .then((res) => ({
      status: 200,
      data: res?.data
    }))
    .catch((er) => ({
      status: 400,
      data: er?.response?.data?.title
    }));

export const RegisterSetReq = async (body) =>
  await Axios.post('/Accounts/Register', body)
    .then((res) => res)
    .catch((er) => er?.response?.data?.title);

export default {
  CheckUserNameReq,
  LoginReq,
  CheckIsSejamiReq,
  SendOtpSejamReq,
  SendOtpForgetPasswordReq,
  ForgetPasswordSetReq,
  RegisterSetReq
};
