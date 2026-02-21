import Comment from "../db/models/Comment.model.ts";
import Post from "../db/models/Post.model.ts";

export const getPosts = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .populate("user", "_id name photo")
      .populate({
        path: "comments",
        populate: { path: "commentCreator", select: "_id name photo" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      posts,
      paginationInfo: {
        currentPage: page,
        numberOfPages: Math.ceil(totalPosts / limit),
        limit,
      },
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getSinglePost = async (postId: string) => {
  try {
    const post = await Post.findById(postId)
      .populate("user", "_id name photo")
      .populate({
        path: "comments",
        populate: { path: "commentCreator", select: "_id name photo" },
      });

    if (!post) throw new Error("Post not found");

    return { post };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createPost = async (
  userId: string,
  body: string,
  image?: string
) => {
  try {
    const post = await Post.create({ body, image, user: userId });
    return Post.findById(post._id).populate("user", "_id name photo");
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  try {
    const comment = await Comment.create({
      content,
      commentCreator: userId,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    return Comment.findById(comment._id).populate(
      "commentCreator",
      "_id name photo"
    );
  } catch (err: any) {
    throw new Error(err.message);
  }
};
