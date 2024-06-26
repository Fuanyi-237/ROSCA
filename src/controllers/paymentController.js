const paymentService = require('../services/paymentService');

exports.initiateContribution = async (req, res) => {
    try {
        const payment = await paymentService.initiateContribution(req.body);
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.disburseFunds = async (req, res) => {
    try {
        const disbursement = await paymentService.disburseFunds(req.body);
        res.status(200).json(disbursement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
