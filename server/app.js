var apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'alert_chat_app',

    // // Use if APM integration requires a token
    // secretToken: '',

    // // Use if APM integration uses API keys for authentication
    // apiKey: '',

    // Set custom APM integration host and port (default: http://127.0.0.1:8200)
    serverUrl: 'http://0.0.0.0:8200',
})



var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const cors = require('cors')

app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
