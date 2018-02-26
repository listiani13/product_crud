// @flow

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import mainRoute from './routes/mainRoute';

import {PORT, CONNECTION_STRING} from './globals/config.js';

let app = express();
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(CONNECTION_STRING);

// Apa fungsi promise???
mongoose.Promise = global.Promise;

// parse application/json
app.use(bodyParser.json());

app.use('/products', mainRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
