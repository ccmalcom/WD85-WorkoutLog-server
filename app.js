require('dotenv').config();
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require('./db');

const middleware = require('./middleware');
const controllers = require('./controllers');

app.use(middleware.headers);
app.use('/user', controllers.userController)
app.use('/log', controllers.logController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then (() =>{
        app.listen(process.env.PORT, () =>{
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) =>{
        console.log(`[Server]: Server Crashed. Error = ${err}`);
    })