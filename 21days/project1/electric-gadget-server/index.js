
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

// app.use(cors());
app.use(cors({ origin: '*' }));

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
    const sellingCollection = db.collection('sales');
    
    
    app.get('/products', async (req, res) => {
      try {
        const cursor = productCollection.find({});
        const product = await cursor.toArray();
    
        const ifSales = sellingCollection.find({});
        const salesProduct = await ifSales.toArray();
    
        const totalSoldMap = salesProduct.reduce((acc, sale) => {
          acc[sale.id] = (acc[sale.id] || 0) + sale.quantity;
          return acc;
        }, {});
    
        const result = product.filter((item) => {
          const totalSold = totalSoldMap[item._id.toString()] || 0;
          return totalSold < item.product_quantity;
        });
    
        console.log(result);
        res.send({ status: true, data: result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, error: 'Internal Server Error' });
      }
    });
    
    app.get('/sales',async (req,res)=>{
      const cursor =sellingCollection.find({});
      const result=await cursor.toArray();
      console.log(result);
      res.send({data:result});      
    })
    
    app.post('/addproduct', async (req, res) => {
      
      const product = req.body;
      if (!product._id) {
        product._id = new ObjectId(); 
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

    app.post('/addsell', async (req, res) => {
      
      const sellingproduct = req.body;
      console.log(sellingproduct);
      const result = await sellingCollection.insertOne(sellingproduct);

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
