const express = require('express');

const router = express.Router();

const index = require('../controllers');

router.get('/apps', index.getApps);
router.get('/devices', index.getDevices);
router.get('/getUsers', index.getUsers);
router.post('/sendnotifica', index.sendNotification);
router.post('/addUser', index.addUser);
module.exports = router;