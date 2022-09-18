const cors = require('cors');
const helmet = require('helmet');
const express = require('express');

const {clientOrigins, clientOriginUrl} = require('./config');
const { loginRouter } 	= require("./loginRouter");
const { logoutRouter } = require('./logoutRouter');

app = express();
app.use(helmet())
app.use(cors({ origin: clientOrigins }))

app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.get('/',(req,res)=>{console.log('getting')})
app.post('/',(req,res)=>{console.log('posting')})
module.exports={app}