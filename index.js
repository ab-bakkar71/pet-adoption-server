const dns= require('node:dns') ;
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config()


const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json())


// Connection URI
const uri = process.env.MongoDB_URI;

// mongoDB client connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db('pet-adoption');
    const pets = database.collection('pets');

    // send data on dataBase

    app.post('/adopt', async(req, res) =>{
      const adopt = req.body;
      console.log('fontend data', adopt);
      const result = await pets.insertOne(adopt);
      res.send(result)


    })


  // get all data
    app.get('/pets', async (req, res) => {
        const cursor = pets.find();
        const results = await cursor.toArray();
        res.json(results);
    });

  // for feature

  app.get('/feature', async(req, res)=>{
    const cursor = pets.find().limit(8);
    const result = await cursor.toArray();
    res.send(result)
  })

    // get one data by id
    app.get ('/pets/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const pet = await pets.findOne(query);
      res.send(pet);
    })

    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});