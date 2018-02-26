// @flow
import mongoose from 'mongoose';

let ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  photo: {
    type: String,
  },
});

export default mongoose.model('Product', ProductSchema);
