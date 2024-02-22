// Importing necessary modules
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose");

// import model
const userModel = require("./models/user");

// middleware setup
app.use(express.json()); // middleware to parse JSON requests
// middleware for CORS (cross-origin resource sharing)

// Connecting to MongoDB database named 'datas' on localhost
mongoose
  .connect("mongodb://127.0.0.1:27017/datas")
  .then(() => {
    console.log("MongoDB is connected");
    // Starting the server to listen on port 8080
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());

// API endpoint for handling GET requests at the root path '/'
app.get("/", (req, res) => {
  res.json("Hello"); // Responding with a JSON message "Hello"
});

// CRUD operations

// POST endpoint to add a user
app.post("/post", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = await userModel.create({ name, age, email });
    res.json(user);
    console.log(err);
  } catch (err) {
    console.error("Error in POST /post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve all users
// app.get('/getdata',async (res, req) => {
//     try{
//         const users=await userModel.find()
//         res.json(users)
//     }
//     catch(err){
//         console.log(err);
//     }
// })
app.get("/getdata", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error in GET /getdata:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.delete('/delete/:id', (req,res) => {
//     const {id} = req.params;
//     const deleteUser = userModel.findByIdAndDelete({_id:id})
//     .then((res) => {
//         res.json(deleteUser)
//         console.log(deleteUser);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params; // Use req.params to get the parameter from the URL
  userModel
    .findByIdAndDelete({ _id: id })
    .then((deletedUser) => {
      console.log(deletedUser);
      res.json(deletedUser);
    })
    .catch((err) => console.error(err));
});

// app.put("/updateuser/:id", (req, res) => {
//   const { id } = req.params;
//   const updateuser = userModel
//     .findByIdAndUpdate({ _id: id })
//     .then((res) => {
//       res.json(updateuser);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.put("/updateuser/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Assuming req.body contains the fields to update (e.g., { name, age, email })
      const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      console.error("Error in PUT /updateuser/:id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
app.get('/getuserbyid/:id', (req,res)=> {
    const {id} = req.params;
    userModel.findById({_id:id})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
