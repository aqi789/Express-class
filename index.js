// Importing necessary modules
const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const mongoose = require('mongoose');

// import model
const userModel = require('./models/user');

// middleware setup
app.use(express.json()); // middleware to parse JSON requests
app.use(cors()); // middleware for CORS (cross-origin resource sharing)

// Connecting to MongoDB database named 'datas' on localhost
mongoose.connect('mongodb://127.0.0.1:27017/datas')
    .then(() => {
        console.log("MongoDB is connected");
        // Starting the server to listen on port 8080
      
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// API endpoint for handling GET requests at the root path '/'
app.get('/', (req, res) => {
    res.json("Hello"); // Responding with a JSON message "Hello"
});

// CRUD operations

// POST endpoint to add a user
app.post('/post', async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const user = await userModel.create({ name, age, email });
        res.json(user);
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
app.get('/getdata', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        console.error("Error in GET /getdata:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});