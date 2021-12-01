const express=require("express");
const bodyParser=require("body-parser");
const app = express();

const fs = require('fs');

app.get("/", (req,res) => {
  fs.readFile("public/images/pic1.jpeg" , (err, data) => {
      const str = data.toString('base64')
      // res.send("data:image/jpeg;base64," + str)
      res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': str.length
   });
      res.end(data)
})
})

app.listen(3000 , () => {
  console.log("listening to port 3000")
})