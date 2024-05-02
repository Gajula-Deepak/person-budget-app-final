const compression = require("compression");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./services/connectDb");
//for gzip compression
app.use(compression({ threshold: 0 }));
//routes
const authenticationRoute = require("./routes/authenticationRoute");
const budgetsRoute = require("./routes/ApiRoutes");
const tokenVerificationMiddleware = require("./tokenVerificationMiddleware");

connectDb();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});

app.use("/authentication", authenticationRoute);
app.use("/api", tokenVerificationMiddleware, budgetsRoute);
