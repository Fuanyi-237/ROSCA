const Transaction = require('../models/transaction');
const momoApi = require('../utils/momoApi');

exports.initiateContribution = async (contributionData) => {
    // Call MOMO API to initiate contribution
    const response = await momoApi.initiatePayment({
        amount: contributionData.amount,
        currency: 'USD',
        externalId: contributionData.groupId,
        payer: {
            partyIdType: 'MSISDN',
            partyId: contributionData.phone
        },
        payerMessage: 'ROSCA Contribution',
        payeeNote: 'Contribution for group'
    });

    // Record the transaction
    const transaction = new Transaction({
        group: contributionData.groupId,
        user: contributionData.userId,
        amount: contributionData.amount,
        type: 'contribution'
    });
    await transaction.save();

    return response;
};

exports.disburseFunds = async (disbursementData) => {
    // Logic to disburse funds to a user
    const response = await momoApi.initiatePayment({
        amount: disbursementData.amount,
        currency: 'USD',
        externalId: disbursementData.groupId,
        payee: {
            partyIdType: 'MSISDN',
            partyId: disbursementData.phone
        },
        payeeMessage: 'ROSCA Disbursement',
        payerNote: 'Disbursement for group'
    });

    // Record the transaction
    const transaction = new Transaction({
        group: disbursementData.groupId,
        user: disbursementData.userId,
        amount: disbursementData.amount,
        type: 'disbursement'
    });
    await transaction.save();

    return response;
};
