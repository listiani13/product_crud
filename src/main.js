// @flow

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import mainRoute from './routes/mainRoute';
import uploadRoute from './routes/uploadRoute';

import {PORT, CONNECTION_STRING} from './globals/config.js';

let app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(CONNECTION_STRING);

// Apa fungsi promise??? supaya mongoosenya ga perlu pake callback
mongoose.Promise = global.Promise;

// parse application/json
app.use(bodyParser.json());

// API to upload files
app.use('/files', uploadRoute);

// API to CRUD Products
app.use('/products', mainRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
