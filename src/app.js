//// app.js
// express routing for API

// other
require('dotenv').config()
var PushBullet = require('pushbullet');
var pusher = new PushBullet(process.env.PUSHBULLETKEY);
const fs = require("fs");
// Bring in our dependencies
const app = require('express')();
//onst routes = require('./routes');
const PORT = process.env.PORT || 3000;

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
console.log(`App listening on port ${PORT}`);
});