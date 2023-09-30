const express = require("express")
const app = express()
const bodyParser=require("body-parser")
const cors = require("cors")
const mongoose=require("mongoose")
const router = require("./Routes/route")
const dotenv=require('dotenv').config();


app.use(bodyParser.json())
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/", router);

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("err occur !!", err);
  });

app.listen(4000, () => {
    console.log("express runnig on port 4000")
})

