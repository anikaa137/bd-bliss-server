const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const  bodyParser = require('body-parser');
require('dotenv').config();
console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME )


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

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

});






app.listen(port)