const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the "CoffeeDB" database and collection
    const database = client.db('coffee-store');
    const coffeeCollection = database.collection('coffees');

    app.get('/coffees', async (req, res) => {
      const allCoffee = await coffeeCollection.find().toArray();
      // console.log(allCoffee);
      res.send(allCoffee);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Sir! Welcome to Coffee Store Sever');
});

app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`);
});
