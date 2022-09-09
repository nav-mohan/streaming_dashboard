const cors = require('cors');
const helmet = require('helmet');
const express = require('express');

const {clientOrigins} = require('./config');
const { loginRouter } 	= require("./loginRouter");
const { logoutRouter } = require('./logoutRouter');

app = express();
app.use(helmet())
app.use(cors({ origin: clientOrigins }))

app.use('/login',loginRouter);
app.use('/logout',logoutRouter);

module.exports={app}