const express = require('express');

const app = express();

const appsRoutes = require('./routes/apps');

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(appsRoutes);

app.use('/', (req, res, next)=>{
    res.send('<h1>One Signal</h1>');
});

app.listen(3000, ()=>{
    console.log("Port listening: 3000")
});

