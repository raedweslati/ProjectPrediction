const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const db = require("./src/db/index");


// pour accepter de cette origine 
const corsOptions = {
  //reactjs
  origin: "*",
};
app.use(cors(corsOptions));



// pour simplifier le process d'accées aux demandes 
app.use(morgan("dev"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route initiale
app.post("/", (req, res) => {
  res.status(200).json({
    message: "Web service gestion stock !",
  });
});

const routes = require("./src/routes/index.routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`🚀 Server ready at http://localhost:${PORT} `.bgGreen);
  } else {
    console.log(`⛔server is down : ${err}`.bgRed);
  }
});
