const express = require('express'); // common js
// import express from 'express'; we can also use this syntax if we "type": "module" in package.json --> module js

const app = express();

 

app.get('/',(req,res)=>{
    res.send(console.log("Server is ready "));
});


app.get('/api/jokes',(req,res)=>{
    const jokes = [
        {
            id : 1,
            title : 'a joke',
            content : 'this is a joke'
        },
        {
            id : 2,
            title : 'a joke 2',
            content : 'this is a joke'
        },
        {
            id : 3,
            title : 'a joke 3',
            content : 'this is a joke'
        },
    ];
    res.send(jokes);
});

const port = process.env.PORT || 3000;


app.listen(port, () =>{
    console.log(`Server is serving at http://localhost:${port}`);
});

// when you RUN this code fisrt time you will get error now resolving the errors

// 1-Error: Cannot find module 'C:\Users\Asus\Desktop\Chai aur Backend\Day2\backend\index.js'

// for this to use change the type in package file;

// json formatter to use api data

// bundlers --> vite 

//tool change the code of js to older version of js

// 2- Error: cors policy error --> it provides safety to the users from malicious attacks -- cross origin resource sharing

// solution : URL whitelist , domain whitelisting , using proxy server , using cors package

// isntall cors package --> npm i cors

// there on deployment we have to handle cors by ourselves ,we ahve ot handle ports also this is for development purpose only

// there is a standard practice of using api in backend / creating routes in backend / creating controllers in backend  etc but for now we are keeping it simple

// app.get('/api/jokes',(req,res)=>{ this route is followed in production level
//     const jokes = [
//         {
//             id : 1,
//             title : 'a joke',
//             content : 'this is a joke'
//         },


// for standardization we use /api in our routes dont write full url in frontend code like 'http://localhost:3000/api/jokes' instead use relative path '/api/jokes'
// but because of cors issue we are using full url in frontend code for now and it is not a valid url because we are not using https in our server so to resolve this issue we can use proxy in vite config file but for now we will use full url with https in frontend code to avoid cors issue

// PROXY --> it acts as an intermediary between client and server it forwards requests from client to server and then sends back the response from server to client it helps in bypassing cors issues because the request appears to come from the proxy server rather than the original client

// how to apply proxy

// if you are using create react app then you can add 'proxy' by using package.json file and paste it there "proxy":https://localhost:4000

// append to hoga hi hoga lekin apke server  ye proxy origin hui hai proxy link https://localhost:3000  

// in deployment change the proxy link to actual backend link where server is deployed

// but we are using vite so for that we have to create vite.config.js file in root of frontend folder 

// here our jokes is not displayed because of two reasons

// 1- useEffect me dependency array missing hai isliye baar baar call ho rha hai
// 2- map function me return missing hai isliye kuch render nahi ho rha hai

// to fix these issues we have to add dependency array in useEffect and return statement in map function it is not good practice to use dependcy array in use effect

// we are using javascript here so we have to return explicitly in map function but we use here () to debug this issue..


// do not serve static file in baceknd (npm run build in frontend) and serve it using express static middleware in backend because we are using proxy here if we serve static files in backend then proxy will not work aage padhenge iss ke baare me
