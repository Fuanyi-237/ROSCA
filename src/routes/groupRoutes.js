const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.post('/', groupController.createGroup);
router.get('/', groupController.getGroups);
router.get('/:id', groupController.getGroupById);
router.post('/:id/members', groupController.addMember);

module.exports = router;
