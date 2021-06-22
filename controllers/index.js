const axios = require('axios');

const keys = require('../config/keys');

const url = 'https://onesignal.com/api/v1';

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'burro100',
    database: 'node-onesignal'
});

// /GET VIEW APPS ONESIGNAL
exports.getApps = async(req, res, next)=>{
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.USER_AUTH_KEY}`
        }
    };
    const response = await axios.get(url + '/apps', config).then(res=> res.data);
    console.log(response);
    res.json(response);
}


// /GET VIEW DEVICES ONESIGNAL
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


// /POST NOTIFICATION FOR ALL SUBSCRIBER ONESIGNAL
exports.sendNotification = async(req, res, next)=>{
    const body = {
        app_id: `${keys.APP_ID}`,
        contents: {"en":"Test API Send Notifica"},
        included_segments: ["Active Users","Subscribed Users"]
    }

    const data = JSON.stringify(body);
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        },
        'body': JSON.stringify(body)
    }
    const response = await axios.post(url + "/notifications", data, config)
                           .then(res=> res.data)
                           .catch(err=> console.log(err));
    console.log(response);
    res.json(response);
}


// /POST NOTIFICATION BASED ON TAGS
exports.sendNotificationTags = async(req, res, next)=>{
    const body = {
        app_id: `${keys.APP_ID}`,
        contents: {"en":"Test API Send Notifica"},
        filters: [
            {"field": "tag", "key": "userId", "relation": "=", "value": "alifnaiech@gmail.com"}
        ]
    }

    const data = JSON.stringify(body);
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${keys.REST_API_KEY}`
        }
    }
    const response = await axios.post(url + '/notifications', data, config).then(res=> res.data).catch(err=> console.log(err));
    console.log(response);
    res.json(response);
}

// /GET USERS FROM DATABASE
exports.getUsers = (req, res, next)=>{
    const query = "SELECT * FROM `node-onesignal`.users;";
    pool.execute(query, (err, result, fields)=>{
        if(err){
            res.json({status: 'faillure', reason: err.code});
        }else{
            res.json(result);
        }
    })
}


// /ADD NEW USER TO DATABASE
exports.addUser = (req, res, next)=>{
    const data = {
        "user": req.body.user
    }
    const query = "INSERT INTO `node-onesignal`.users (user) VALUES(?)";
    pool.execute(query, Object.values(data), (err, result, fields)=>{
    if(err){
        res.json({status: "faillure", reason: err.code});
    }else{
        res.json(data);
    }
    });
}


