// @flow
import mongoose from 'mongoose';

let FileSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  photoLoc: {
    type: String,
  },
});

export default mongoose.model('File', FileSchema);
