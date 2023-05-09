const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("CONNECTIONS: ", con.connections);
    console.log("connection successful");
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [, "Must include a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Must include a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);
const testTour = new Tour({
  name: "The park camper",
  rating: 4.7,
  price: 500,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
