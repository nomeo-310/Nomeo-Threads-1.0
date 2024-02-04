import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  bio: { type: String },
  image: { type: String },
  threads: [{type: mongoose.Schema.ObjectId, ref: 'Thread'}],
  onboarded: { type: Boolean, default: false},
  communities: [{type: mongoose.Schema.ObjectId, ref: 'Community'}],
});

(mongoose.models as any) = {};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;