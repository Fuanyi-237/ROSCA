module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://172.17.0.2:27017/rosca',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    MOMO_API_BASE_URL: process.env.MOMO_API_BASE_URL || 'https://sandbox.momodeveloper.mtn.com',
    MOMO_SUBSCRIPTION_KEY: process.env.MOMO_SUBSCRIPTION_KEY || 'your_subscription_key',
    MOMO_API_KEY: process.env.MOMO_API_KEY || 'your_api_key',
    EMAIL_USER: process.env.EMAIL_USER || 'fuanyijude@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'churchboy2000F@'
};
