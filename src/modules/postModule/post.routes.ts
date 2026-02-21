import { Router } from "express";
import * as postController from './post.controller.ts'
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
const postRouter = Router();

postRouter.get('/',authMiddleware,postController.getPosts)
postRouter.get('/:id', postController.getSinglePost)
postRouter.post('/', postController.createPost)
postRouter.post('/:id/comment', postController.createComment)

export default postRouter;