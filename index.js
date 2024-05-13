
const express = require('express')
const app = express();
const PORT = 3001;

app.get("/",(req,res)=>{
    res.send("Hi, Welcome to MongoDb")
})

app.listen(PORT,()=>{
    console.log(`Server in running at http://localhost:${PORT}`);
})