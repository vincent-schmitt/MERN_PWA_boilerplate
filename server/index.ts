/*
This is a robust user Backend

_______DEPENDENCIES_________

express
mongoose
cors
body-parser

*/

import * as express from "express";
import * as cors from "cors";
import { json, urlencoded } from "body-parser";
import * as path from "path";
import { redirectToHTTPS } from "express-http-to-https";

// initialize app
const app = express();

/*
_____CONFIGURATIONS______*/

import config from "./config/main";

//---PORT---

const port = config.port;

/*//--- MongoURI ---
import { mongoURI } from "./config/secrets";
 The file should have a setup of:
module.exports = {
  mongoURI: <personal mongoURI>
} */

// general CONFIGS
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);
const ignoreHosts = [/localhost:3000/, /localhost:5000/];
const ignoreRoutes: RegExp[] = [];
app.use(redirectToHTTPS(ignoreHosts, ignoreRoutes));

// // connect to MongoDB
// connect(
//   mongoURI,
//   { useNewUrlParser: true }
// )
//   .then(() => console.log("MongoDb connected"))
//   .catch(err => console.log(err));

// ROUTES

// import Users from "./routes/Users";

// app.use("/user", Users);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client"));
  //   app.get("/sw.js", (req, res) => {
  //     res.sendFile(path.resolve(__dirname, "client/", "sw.js"));
  //   });
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("client/", "index.html"), (err: string) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
