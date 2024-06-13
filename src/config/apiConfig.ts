import axios from 'axios';
import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL;

export const endpoints = {
  cashIn: `${API_URL}/cash-in`,
  cashOutNatural: `${API_URL}/cash-out-natural`,
  cashOutJuridical: `${API_URL}/cash-out-juridical`
};

export const getCashInConfig = async () => {
  const response = await axios.get(endpoints.cashIn);
  return response.data;
};

export const getCashOutNaturalConfig = async () => {
  const response = await axios.get(endpoints.cashOutNatural);
  return response.data;
};

export const getCashOutJuridicalConfig = async () => {
  const response = await axios.get(endpoints.cashOutJuridical);
  return response.data;
};
