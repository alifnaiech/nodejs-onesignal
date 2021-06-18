const fetch = require('node-fetch');

const keys = require('../config/keys')

const url = 'https://onesignal.com/api/v1';


// /GET VIEW APPS 
exports.getApps = async (req, res, next)=>{
    const options = {
        'method' : 'GET',
        'headers' : {
            'Content-Type' : 'application/json',
            'Authorization' : `Basic ${keys.USER_AUTH_KEY}`
        }
    };
    const response = await fetch(url + '/apps', options)
                            .then(res => res.json())
                            .catch(err=> console.log(err));
    res.json(response);
}


// /GET VIEW DEVICES
exports.getDevices = async (req, res, next)=>{
    const options = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        }
    }
    const response = await fetch(url + `/players?app_id=${keys.APP_ID}`, options)
                          .then(res=> res.json())
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
    const options = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        },
        'body': JSON.stringify(body)
    }
    const response = await fetch(url + "/notifications", options)
                           .then(res=> res.json())
                           .catch(err=> console.log(err));
    console.log(response);
    res.json(response);
}