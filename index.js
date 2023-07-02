// This line imports the express module, which is a popular Node.js framework for building web applications.
//  It allows you to handle HTTP requests, define routes, and more.
const express = require('express');
const cookieParser = require('cookie-parser');
// It creates an instance of express
const app = express();
const port = 8000;

const path = require('path');
const db = require('./config/mongoose');
// express-ejs-layouts is an Express middleware that allows you to use EJS layouts,
// which are templates that define the common structure of your web pages.
const expressLayouts = require('express-ejs-layouts');
const exp = require('constants');
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
/* Use express routers */
// This is middleware  for handling root request
app.use('/' , require('./routes'));
app.use('/users' , require('./routes'));
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