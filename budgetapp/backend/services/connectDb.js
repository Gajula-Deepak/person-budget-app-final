const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(
      "mongodb+srv://testuser:testuser@test.i71fpmb.mongodb.net/?retryWrites=true&w=majority&appName=test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));
};

module.exports = connectDb;
