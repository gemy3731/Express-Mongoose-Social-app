import { Router } from "express";
import * as postController from './post.controller.ts'
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import uploadCloud from "../../middlewares/multerCloud.ts";
const postRouter = Router();

postRouter.get('/',authMiddleware,postController.getPosts)
postRouter.get('/:id',authMiddleware, postController.getSinglePost)
postRouter.post('/',authMiddleware,uploadCloud().single('image'), postController.createPost)
postRouter.post('/:id/comment',authMiddleware, postController.createComment)

export default postRouter;