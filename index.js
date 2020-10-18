const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const pass ="Agency123"

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dhmoa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000
const app = express()
app.use(cors());
app.use(bodyParser.json());




const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const orderCollection = client.db("creativeAgency").collection("order");
 
  app.post("/addOrder", (req, res)=>{
    const order = req.body;
    orderCollection.insertOne(order)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
  })
});



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.listen(process.env.PORT||port)