const express = require('express');
const subdomain = require('express-subdomain');
const bodyParser = require('body-parser')
let webserver = express();
const session = require('express-session');

webserver.set('trust proxy', 1);
webserver.use(session({
    secret: 'IUiosoanz83c89n4343q8n24iu4393498z',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));


let authRouter = require('./router/authRouter');
let eventRouter = require('./router/calendarRouter');
let todoRouter = require('./router/todoRouter');

authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({ extended: true }));
webserver.use(authRouter);
webserver.use(eventRouter);
webserver.use(todoRouter);


webserver.listen(5050, function() {
    console.log("Evendo Backend is listening on :5050");
});