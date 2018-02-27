/** ABAIKAN FILE INI **/
import File from '../models/FileModel';
import mongoose from 'mongoose';

// Promise di mongoose biar si mongoosenya bisa pake await(?)
mongoose.connect('mongodb://localhost:27017/Products');
mongoose.Promise = global.Promise;

async function getLatestID() {
  try {
    let id = await File.find({}, {id: 1})
      .sort({id: -1})
      .limit(1);
    return id[0].id;
  } catch (e) {
    console.log(e);
  }
}

getLatestID()
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log('error');
    console.log(err);
  });
// a.then((err, data) => {
//   console.log('HEllo this is ', data);
//   if (err) {
//     console.log(err);
//   }
// });
