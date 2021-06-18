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
