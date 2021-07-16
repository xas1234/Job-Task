const express = require("express");
const router = require("./router");

const database = require("./model/database");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connection
database
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const corsOpts = {
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
