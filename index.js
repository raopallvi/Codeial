// This line imports the express module, which is a popular Node.js framework for building web applications.
//  It allows you to handle HTTP requests, define routes, and more.
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose');
// express-ejs-layouts is an Express middleware that allows you to use EJS layouts,
// which are templates that define the common structure of your web pages.
const expressLayouts = require('express-ejs-layouts');
const exp = require('constants');

/**************requiring lib for authentication *****************/
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');

// Every time when server restart then all users gets log out and again all data sends to server.
// it is very bad practice so to improve it we use persistent storage to store all authenticated users.
// so we user mongo store.
const MongoStore = require('connect-mongo')(session);

// It creates an instance of express
const app = express();
app.use(express.static('./assets'));
app.use(cookieParser());
app.use(express.urlencoded());
// all views which are to be rendered belongs to a particular layout
app.use(expressLayouts);

// Extract style and script from various pages and put into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , "views"));

// mongo store is used to store the session cookie in db
app.use(session({
    // name of cookie
    name : "codeial",
    // for encoding and decoding we use a secret key
    // To Do change secret before deployement in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        // for how long should cookie will be valid  , when sholud it expires
        maxAge : (1000 * 60 * 100), // this is time in milisceonds
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || "Connection Ok");
    }
    )
}));

app.use(passport.initialize()); 
app.use(passport.session());
// this function or middleware will set authenticated user in locals
app.use(passport.setAuthenticatedUser);


/* Use express routers */
// This is middleware  for handling root request
app.use('/' , require('./routes'));

app.listen(port , function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Running on Port : ${port}`);
    console.log(`http://127.0.0.1:${port}`);
}) 