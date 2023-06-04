const express = require('express');
const app = express();
const port = 8000;

/* Use express routers */
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