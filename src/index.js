// const express = require('express');
// const dotenv = require('dotenv');
// const { default: mongoose } = require('mongoose');
// const routes = require('./routes');
// const bodyParser = require('body-parser');
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3333;

// app.use(bodyParser.json());

// routes(app)

// mongoose.connect('mongodb://localhost:27017')
//     .then(() => {
//         console.log('Connected to database');
//     })
//     .catch(err => {
//         console.log('Connect failed to database',err);
//     })


// app.listen(port, () => {
//     console.log('Server listening on port:', port);
// });

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());

// Sử dụng routes từ tệp routes
routes(app);

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Failed to connect to database', err);
    });

// Định nghĩa route đơn giản
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Lắng nghe kết nối
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
