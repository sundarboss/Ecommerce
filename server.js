const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const userRoute = require('./routes/userroute');
const adminRoute = require('./routes/adminroute');

var app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db!')
});

app.use(cors({origin: '*'}));

app.use(helmet());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);


app.listen(5000, () => {
    console.log('Server is up and running on port 5000');
});