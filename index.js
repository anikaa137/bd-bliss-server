const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
// console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME )
const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mivuu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('err payce', err)
  const glassCollection = client.db("bdbliss").collection("glass");
  console.log('data connected')

  app.post('/addProduct', (req, res) => {
    // console.log('sdfs',req)
    const newProduct = req.body;
    console.log('adding pro', newProduct)
    glassCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/product', (req, res) => {
    glassCollection.find()
      .toArray((err, items) => {
        res.send(items)
        // console.log('from database', items)
      })
  })

  app.get('/product/:id', (req, res) => {
    glassCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
        console.log(err, documents)
      })
  });


})

app.listen(port);