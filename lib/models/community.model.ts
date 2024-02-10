import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  bio: { type: String },
  image: { type: String },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  threads: [{type: mongoose.Schema.ObjectId, ref: 'Thread'}],
  members: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
});

(mongoose.models as any) = {};

const Community = mongoose.models.User || mongoose.model('Community', communitySchema);

export default Community;