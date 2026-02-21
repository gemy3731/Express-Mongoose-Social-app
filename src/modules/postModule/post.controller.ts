import type { Request, Response } from "express";
import * as postService from "../../services/post.service.ts";
import type { AuthRequest } from "../../middlewares/auth.middleware.ts";

// export interface AuthRequest extends Request {
//     user: {
//       id: string;
//       email: string;
//       name: string;
//     };
//   }
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    const posts = await postService.getPosts(Number(page) || 1);

    return res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Post not found" });

    const post = await postService.getSinglePost(id as string);

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {};

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;

    if (!id) return res.status(400).json({ error: "Post not found" });
    if (!content)
      return res.status(400).json({ error: "Comment content is required" });
    if (!user) return res.status(400).json({ error: "User not found" });

    const comment = await postService.createComment(
      user.id,
      id as string,
      req.body.content
    );

    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
