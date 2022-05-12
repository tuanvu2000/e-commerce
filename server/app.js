const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const appRoute = require('./src/routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
    .connect(process.env.MONGODB_URL_ONL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(port);
        console.log(`Mongodb connected width port ${port}`);
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    })

app.use('/api', appRoute)