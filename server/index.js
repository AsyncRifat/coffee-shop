const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

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

    // create a coffee data in database through post request
    app.post('/add-coffee', async (req, res) => {
      const coffeeData = req.body;
      const result = await coffeeCollection.insertOne(coffeeData);
      console.log(result);

      res.status(201).send({ ...result, message: 'paice vai' });
    });

    // get a single coffee
    app.get('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const coffee = await coffeeCollection.findOne(query);
      console.log(coffee);
      res.send(coffee);
    });

    // get a single coffee by email
    app.get('/my-coffees/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email }; //short hand: {email:email}
      const result = await coffeeCollection.find(query).toArray();
      res.send(result);
    });

    // handle like toggle
    app.patch('/like/:coffeeId', async (req, res) => {
      const id = req.params.coffeeId;
      const email = req.body.email;
      const query = { _id: new ObjectId(id) };
      const coffee = await coffeeCollection.findOne(query);

      // check if the user have already like the coffee or not
      const alreadyLike = coffee?.likedBy.includes(email);

      // console.log('akdom shurur like er obosta ---> alreadyLike:', alreadyLike);

      const updateDoc = alreadyLike
        ? {
            $pull: {
              // dislike coffee (pop email in likeBy array)
              likedBy: email,
            },
          }
        : {
            $addToSet: {
              // like coffee (push email in likeBy array)
              likedBy: email,
            },
          };

      await coffeeCollection.updateOne(query, updateDoc);

      // console.log(
      //   'akdom shurur like er obosta ---> alreadyLike:',
      //  alreadyLike
      // );

      res.send({
        message: alreadyLike ? 'Dislike Successful' : 'Like Successful',
        liked: !alreadyLike,
      });
    });

    app.delete('/coffee-delete/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const deletingResult = await coffeeCollection.deleteOne(query);
      console.log(deletingResult);
      res.send(deletingResult);
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
