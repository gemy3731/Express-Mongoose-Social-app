import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  body: string;
  image?: string;
  user: mongoose.Types.ObjectId;
  comments?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    body: {
      type: String,
      required:  function (this: IPost) {
        return !this.image;
      },
      trim: true,
    },
    image: {
      type: String,
      required:function (this: IPost) {
        return !this.body;
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


PostSchema.index({ user: 1, createdAt: -1 });

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;