const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


const cards = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn React from scratch with hands-on projects.",
    price: 0,
    image: "https://via.placeholder.com/300x200",
    instructor: "Abir Hasan"
  },
  {
    id: 2,
    title: "Node.js & Express",
    description: "Build backend APIs using Node.js and Express.",
    price: 49,
    image: "https://via.placeholder.com/300x200",
    instructor: "John Doe"
  },
  {
    id: 3,
    title: "MongoDB Mastery",
    description: "Understand MongoDB and data modeling deeply.",
    price: 29,
    image: "https://via.placeholder.com/300x200",
    instructor: "Jane Smith"
  }
];


app.post('/painandgain',(req,res)=>{
    const gain = req.body;
    res.send(gain);
})





app.get('/',(req,res)=>{
    res.send("it's happening");
})

app.get('/rockon',(req,res)=>{
    res.send(cards);

})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})