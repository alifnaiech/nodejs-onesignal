const express = require('express');

const router = express.Router();

const getApps = require('../controllers/apps');

router.get('/apps', getApps.getApps);
router.get('/devices', getApps.getDevices);
router.post('/sendnotifica', getApps.sendNotification);
module.exports = router;