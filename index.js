const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
app.use(cors());
app.use(express.json());

// Connection URI
const uri = process.env.MongoDB_URI;

// mongoDB client connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
);

const logger = (req, res, next) => {
  console.log(`${req.method} | ${req.url}`);
  next();
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  try {
    const JWKS = createRemoteJWKSet(
      new URL("http://localhost:3000/api/auth/jwks"),
    );
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    req.user = payload;
    console.log("user", req.user);
    next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return res.status(401).json({ message: "Unauthorize" });
  }
};

async function run() {
  try {
    await client.connect();
    const database = client.db("pet-adoption");
    const pets = database.collection("pets");

    // send data on dataBase

    app.post("/adopt", async (req, res) => {
      const adopt = req.body;

      const petData = {
        ...adopt,
        status: "available", // default status
        createdAt: new Date(),
      };
      console.log("fontend data", petData);
      const result = await pets.insertOne(petData);
      res.send(result);
    });

    // get all data
    app.get("/pets", async (req, res) => {
      const { search } = req.query;
      // let cursor;
      // if(search){

      //   cursor = pet.find({ title: search})
      // }
      const cursor = pets.find();
      const results = await cursor.toArray();
      res.json(results);
    });

    // for feature

    app.get("/feature", async (req, res) => {
      const cursor = pets.find().limit(8);
      const result = await cursor.toArray();
      res.send(result);
    });

    // get one data by id
    app.get("/pets/:id", logger, verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const pet = await pets.findOne(query);
      res.send(pet);
    });

    // get data by email
    app.get("/my-listings/:email", async (req, res) => {
      const email = req.params.email;

      const query = {
        ownerEmail: email,
      };
      const result = await pets.find(query).toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
