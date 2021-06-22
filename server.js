const express = require('express');

const app = express();

const appsRoutes = require('./routes');


// const query = "SELECT * FROM `node-onesignal`.users;";
//     pool.execute(query, (results, fields, err)=>{
//         // console.log(results);
//         console.log(JSON.stringify(fields[0]));
//     })


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(appsRoutes);

app.use('/', (req, res, next)=>{
    res.send('<h1>Home PAGE</h1>');
});

app.listen(3000, ()=>{
    console.log("Port listening: 3000")
});

