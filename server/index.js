const express = require('express');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// local storage verify token
const localStorageVerifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    console.log(decoded.email);

    req.decodedEmail = decoded.email;
    next();
  });
};

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
    const orderCollection = database.collection('orders');

    // generate jwt
    app.post('/jwt', (req, res) => {
      // const user = { email: req.body.email };    // i can any data load not only email
      const userEmail = req.body;

      // token creation
      const token = jwt.sign(userEmail, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
      });

      // store token in the cookies
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: false,
      // });

      res.send({ token: token, message: 'jwt create successful' });
    });

    app.get('/coffees', async (req, res) => {
      const allCoffee = await coffeeCollection.find().toArray();
      // console.log(allCoffee);
      res.send(allCoffee);
    });

    // create a coffee data in database through post request
    app.post('/add-coffee', async (req, res) => {
      const coffeeData = req.body;

      // order k manage korar jonno number e convert kore DB te dilam
      const quantity = coffeeData.quantity;
      coffeeData.quantity = parseInt(quantity);

      const result = await coffeeCollection.insertOne(coffeeData);
      console.log(result);

      res.status(201).send({ ...result, message: 'paice vai' });
    });

    // get a single coffee
    app.get('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const coffee = await coffeeCollection.findOne(query);
      // console.log(coffee);
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
      console.log(email);
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

    // handle order
    app.post('/place-order/:coffeeId', async (req, res) => {
      const id = req.params.coffeeId;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid coffee ID' });
      }
      const orderData = req.body;
      const result = await orderCollection.insertOne(orderData);
      if (result.acknowledged) {
        // update quantity from coffee collection
        await coffeeCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: {
              quantity: -1,
            },
          }
        );
      }

      res.status(201).send(result);
    });

    // get all orders by customer email
    app.get('/my-orders/:email', localStorageVerifyToken, async (req, res) => {
      const decodedEmail = req.decodedEmail;
      console.log('email from JWT token ---->',decodedEmail);

      const email = req.params.email;
      console.log('email from params ---->', email);

      if (decodedEmail!==email) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      const filter = { customerEmail: email };
      const allOrders = await orderCollection.find(filter).toArray();

      for (const order of allOrders) {
        const orderId = order.coffeeId;
        const fullCoffeeData = await coffeeCollection.findOne({
          _id: new ObjectId(orderId),
        });
        order.name = fullCoffeeData.name;
        order.photo = fullCoffeeData.photo;
        order.price = fullCoffeeData.price;
        order.quantity = fullCoffeeData.quantity;
      }

      res.send(allOrders);
    });

    app.put('/coffee-update/:id', async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoffee = req.body;
      const updatedDoc = {
        $set: updatedCoffee,
      };
      const result = await coffeeCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete('/coffee-delete/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const deletingResult = await coffeeCollection.deleteOne(query);
      // console.log(deletingResult);
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
