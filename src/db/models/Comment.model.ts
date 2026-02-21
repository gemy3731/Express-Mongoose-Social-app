import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  content: string;
  commentCreator: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    commentCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Comment must belong to a post"],
    },
  },
  {
    timestamps: true,
  }
);


CommentSchema.index({ post: 1, createdAt: -1 });

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;