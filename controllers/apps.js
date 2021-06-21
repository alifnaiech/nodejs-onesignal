const fetch = require('node-fetch');

const axios = require('axios');

const keys = require('../config/keys');

const url = 'https://onesignal.com/api/v1';


// /GET VIEW APPS 
exports.getApps = async(req, res, next)=>{
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.USER_AUTH_KEY}`
        }
    };
    const response = await axios.get(url + '/apps', config).then(res=> res.data);
    res.json(response);
}

// /GET VIEW DEVICES 
exports.getDevices = async (req, res, next)=>{
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        }
    }
    const response = await axios.get(url + `/players?app_id=${keys.APP_ID}`, config)
                          .then(res=> res.data)
                          .catch(err=> console.log(err));
    res.json(response);
} 


// /POST NOTIFICATION
exports.sendNotification = async(req, res, next)=>{
    const body = {
        app_id: `${keys.APP_ID}`,
        contents: {"en":"Test API Send Notifica"},
        included_segments: ["Active Users","Subscribed Users"] 
    }

    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        },
        'body': JSON.stringify(body)
    }

    const response = await axios.post(url + "/notifications", config).then(res=> res.data).catch(err=> console.log(err));
    res.json(response);
}