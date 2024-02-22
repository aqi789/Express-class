// Import the express module
const express = require('express');

// Create an instance of the express application
const hello = express();

// Set the port number to 3001
const port = 3001;

const path = require('path')

// Define a route for the root URL ('/') using the HTTP GET method
hello.get('/', (req, res) => {
    // Send the string 'Hello world from express' as the response

    // res.send('<h1>Hello</h1>')

    //getting a html file as response
    res.sendFile(path.join(__dirname, 'index.html'))
})

//product page
hello.get('/product', (req, res) => {
    res.send('Product page')
})

hello.post('/product', (req, res) => {
    res.send('Product created')
})

hello.put('/product', (req, res) => {
    res.send('Product edited')
})

hello.delete('/product', (req, res) => {
    res.send('Product deleted')
})

//about page
hello.get('/about', (req, res) => {
    res.send('About page')
})

//contact page
hello.get('/contact', (req, res) => {
    res.send('contact page')
})

// Make the server listen on the specified port
hello.listen(port, () => {
    // Log a message to the console when the server is successfully started
    console.log(`app listening on port ${port}`);
})