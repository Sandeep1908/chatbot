import express from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
import router from './routes/dialogflow.js'
// import config from "./server/config/keys.js";
// const mongoose = require("mongoose");
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/dialogflow', router);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
