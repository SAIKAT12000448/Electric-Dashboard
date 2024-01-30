
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lrc63.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// const uri = `mongodb+srv://redux:dgLiilEsKKV1g2tw@cluster0.lrc63.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
const run = async () => {
  try {
    const db = client.db('Electric-Gadget');
    const productCollection = db.collection('products');
    const usersCollection = db.collection('users');
    
    
    app.get('/products', async (req, res) => {
    
      const cursor = productCollection.find({});
      console.log(cursor);
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });
    
    
    
    app.post('/addproduct', async (req, res) => {
      
      const product = req.body;
      if (!product._id) {
        product._id = new ObjectId(); // Generate a new ObjectId for the _id field
      }
      const result = await productCollection.insertOne(product);

      res.send(result);
    });

    app.post('/signup', async (req, res) => {
      
      const users = req.body;
      console.log(users);
      const result = await usersCollection.insertOne(users);

      res.send(result);
    });



    app.get('/login', async (req, res) => {
      
      const users = req.body;
      
      const result = await usersCollection.findOne(users);
      if (!result) return res.status(401).send("User not found.");
     
      console.log(result);
      res.send(result); 
    });
 
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
    const query = {_id:new ObjectId(id)}

      const result = await productCollection.findOne(query);

      console.log(result);
      res.send(result);
    }); 


    app.delete('/deleteproduct/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const result = await productCollection.deleteOne({ _id:new ObjectId(id) });
      // console.log(result);
      res.send(result);
    });


    
    app.post('/comment/:id', async (req, res) => {
      const productId = req.params.id;
      const comment = req.body.comment;

      console.log(productId);
      console.log(comment);

      const result = await productCollection.updateOne(
        { _id: ObjectId(productId) },
        { $push: { comments: comment } }
      );

      console.log(result);

      if (result.modifiedCount !== 1) {
        console.error('Product not found or comment not added');
        res.json({ error: 'Product not found or comment not added' });
        return;
      }

      console.log('Comment added successfully');
      res.json({ message: 'Comment added successfully' });
    });

    app.get('/comment/:id', async (req, res) => {
      const productId = req.params.id;

      const result = await productCollection.findOne(
        { _id: ObjectId(productId) },
        { projection: { _id: 0, comments: 1 } }
      );

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    });

    app.post('/user', async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.put('/updateproduct', async (req, res) => {
      const productData = req.body;
      const productId = productData._id;
      delete productData._id; 
    
      console.log('pro ', productData);
    
      const filter = { _id: new ObjectId(productId) };
      console.log(filter);
      
      const options = { upsert: true };
      const updateDoc = { $set: productData };
      console.log(updateDoc);
    
      const result = await productCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    
  




  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
