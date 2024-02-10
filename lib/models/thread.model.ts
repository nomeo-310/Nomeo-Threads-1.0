import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  thread: { type: String, require: true },
  threadImage: {type: String},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  createdAt: { type: Date, default: Date.now },
  parentId: {type: String, },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
  likes: { type: Array}
});
 
(mongoose.models as any) = {};

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;