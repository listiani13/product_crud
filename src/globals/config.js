// @flow

require('dotenv').config();

let PORT = process.env.PORT || 8080;
let CONNECTION_STRING = process.env.CONNECTION_STRING;
let SECRET = process.env.SECRET;

export {PORT, CONNECTION_STRING, SECRET};
