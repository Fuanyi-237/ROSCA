const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * /example:
 *   get:
 *     summary: bla bla
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post('/contribute', paymentController.initiateContribution);
router.post('/disburse', paymentController.disburseFunds);
router.get('', (_, res) => {
    res.json({Message: 'Success'});
});

module.exports = router;
