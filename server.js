const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const db = require('./module/database');
const userRoute = require('./router/userRoute');
const adminRoute = require('./router/adminRoute');


const app = express();
app.use(express.json());

app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods' , 'GET , POST, PUT ,PATCH , DELETE , OPTIONS')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type , Authorization')
    next()
})

app.use("/csv" , express.static(path.join(__dirname,'csv')))




// App Router Start

app.use("/api/v2" , userRoute)
app.use("/admin/api/v2" , adminRoute)



// App Router End


// App Get Error Start

app.use((error,req,res,next) => {
   
    return res.status(501).json({error :error.message})
    
})

// App Get Error End

// Start Server
app.listen(9000 , () => {
    console.log("server is started")
})
