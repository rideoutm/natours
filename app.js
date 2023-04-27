const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./starter/routes/tourRoutes");
const userRouter = require("./starter/routes/userRoutes");

// 1) MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "SERVER SIDE", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });

// Routes
// app.get("/api/v1/tours", (req, res) => {
//     res.status(200).json({
//         status: "success",
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: { tours: tours },
//       });
// });

// app.get("/api/v1/tours/:id", (req, res) => {
//   console.log(req.params);

//   const id = req.params.id * 1;

//   if (id > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   const tour = tours.find((el) => el.id === id);

//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: tour,
//     },
//   });
// });

// ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

///////////////////////// ALTERNATE SYNTAX

// app.post("/api/v1/tours", (req, res) => {
//   //   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);
//   fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
//     res.status(201).json({
//       status: "success",
//       data: {
//         tour: newTour,
//       },
//     });
//   });
// });

// app.patch("/api/v1/tours/:id", (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Failed to update",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: "UPDATED Tour",
//     },
//   });
// });

module.exports = app;
