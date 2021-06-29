const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const appsRoutes = require('./routes');

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api',appsRoutes);

app.use('/', (req, res, next)=>{
    res.send('<h1>Home PAGE</h1>');
});

app.listen(PORT, ()=>{
    console.log(`Port listening: ${PORT}`);
});

