const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// const cards = [
//   {
//     id: 1,
//     title: "React for Beginners",
//     description: "Learn React from scratch with hands-on projects.",
//     price: 0,
//     image: "https://via.placeholder.com/300x200",
//     instructor: "Abir Hasan"
//   },
//   {
//     id: 2,
//     title: "Node.js & Express",
//     description: "Build backend APIs using Node.js and Express.",
//     price: 49,
//     image: "https://via.placeholder.com/300x200",
//     instructor: "John Doe"
//   },
//   {
//     id: 3,
//     title: "MongoDB Mastery",
//     description: "Understand MongoDB and data modeling deeply.",
//     price: 29,
//     image: "https://via.placeholder.com/300x200",
//     instructor: "Jane Smith"
//   }
// ];





const uri = "mongodb+srv://lms_user:PAIp8MsjfMCDdouV@cluster0.knekqnq.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const { ObjectId } = require('mongodb');
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const carccollection=client.db('courseDB').collection('coursecollection');
    const usercollection=client.db('courseDB').collection('usercollection');
    await client.db("admin").command({ ping: 1 });
     

    app.get('/courses',async(req,res)=>{
        const technext= await carccollection.find().toArray();
        res.send(technext);
    })

    app.get('/course/:id',async(req,res)=>{
      const {id}= req.params;
      const course = await carccollection.findOne({ _id: new ObjectId(id) });
      res.send(course);
      
    })

  app.patch("/users/role", async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role required" });
  }

  const result = await usercollection.updateOne(
    { email: email },
    { $set: { role: role } }
  );

  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: "User not found or role unchanged" });
  }

  res.json({ message: "Role updated successfully" });
});

    app.post('/userrolewithdata',async(req,res)=>{
       const {username,email}= req.body;
     const result = await usercollection.insertOne({
  username,
  email,
  role: "teacher"
});
     res.send(result);
      

    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





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