import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`${API_URL}${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        return amount * rate;
    } catch (error) {
        console.error('Erro na conversão de moeda:', error);
        return 0;
    }
};
