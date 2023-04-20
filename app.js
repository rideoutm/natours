const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

// 1) MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

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

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Failed to update",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "UPDATED Tour",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(204).json({ status: "success", data: null });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

app.route("/api/v1/tours").get(getAllTours).post(addTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).post(createUser);
app.route("/api/v1/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

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

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
