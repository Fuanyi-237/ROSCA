const axios = require('axios');
const config = require('../config');

const momoApi = axios.create({
    baseURL: config.MOMO_API_BASE_URL,
    headers: {
        'Ocp-Apim-Subscription-Key': config.MOMO_SUBSCRIPTION_KEY,
        'Authorization': `Bearer ${config.MOMO_API_KEY}`
    }
});

exports.initiatePayment = async (paymentData) => {
    try {
        const response = await momoApi.post('/v1_0/paymentrequests', paymentData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Payment initiation failed');
    }
};
