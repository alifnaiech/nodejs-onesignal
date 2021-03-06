const axios = require('axios');

const keys = require('../config/keys');

const url = 'https://onesignal.com/api/v1';

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sirine',
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
exports.getDevices = async(req, res, next)=>{
    let auth = req.body.userApiKey
    let REST_API_KEY = '';
    let APP_ID = '';
    const data = {
        "userApiKey" : auth
    }
    const query = "SELECT * FROM `node-onesignal`.users WHERE userApiKey=?;";
    pool.execute(query, Object.values(data), async (err, result, fields)=>{
        if(result == null || result == ''){
            res.status(400).json({status: "faillure"});
        }else{
            REST_API_KEY = result[0].osRestApiKey;
            APP_ID = result[0].osAppId;
            const config = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${REST_API_KEY}`
                }
            }
            const response = await axios.get(url + `/players?app_id=${APP_ID}`, config)
                          .then(res=> res.data)
                          .catch(err=> res.status(400).json(err));
            res.json(response);
        }

    });

}

// /POST SEND NOTIFICATION BASED ON TAGS
exports.sendNotification = async(req, res, next)=>{
    let auth = req.body.userApiKey;
    let headings = req.body.headings;
    let contents = req.body.contents;
    let filters = req.body.filters;
    let REST_API_KEY = '';
    let APP_ID = '';
    const data = {
        "userApiKey" : auth
    }
    const query = "SELECT * FROM `node-onesignal`.users WHERE userApiKey=?;";
    pool.execute(query, Object.values(data), async (err, result, fields)=>{
        if(result == null || result == ''){
            res.status(400).json({status: "faillure"});
        }else{
            REST_API_KEY = result[0].osRestApiKey;
            APP_ID = result[0].osAppId;
            const body = {
                app_id: `${APP_ID}`,
                contents: contents,
                headings: headings,
                filters: filters
            }
            const data = JSON.stringify(body);
            const config = {
                        'headers': {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${REST_API_KEY}`
                        }
                    }
            const response = await axios.post(url + '/notifications', data, config).then(res=> res.data).catch(err=> res.status(400).json(err));
            console.log(response);
            res.json(response);
        }
    });
}




// /POST NOTIFICATION FOR ALL SUBSCRIBER ONESIGNAL
// exports.sendNotification = async(req, res, next)=>{
//     const body = {
//         app_id: `${keys.APP_ID}`,
//         contents: {"en":"Test API Send Notifica"},
//         included_segments: ["Active Users","Subscribed Users"]
//     }

//     const data = JSON.stringify(body);
//     const config = {
//         'headers': {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${keys.REST_API_KEY}`
//         },
//         'body': JSON.stringify(body)
//     }
//     const response = await axios.post(url + "/notifications", data, config)
//                            .then(res=> res.data)
//                            .catch(err=> console.log(err));
//     console.log(response);
//     res.json(response);
// }


// /POST NOTIFICATION BASED ON TAGS
// exports.sendNotification = async(req, res, next)=>{

//     const body = {
//         app_id: `${keys.APP_ID}`,
//         contents: {"en":"Test API Send Notifica"},
//         filters: [
//             {"field": "tag", "key": "userId", "relation": "=", "value": "alifnaiech@gmail.com"}
//         ]
//     }

//     const data = JSON.stringify(body);
//     const config = {
//         'headers': {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${keys.REST_API_KEY}`
//         }
//     }
//     const response = await axios.post(url + '/notifications', data, config).then(res=> res.data).catch(err=> console.log(err));
//     console.log(response);
//     res.json(response);
// }

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


