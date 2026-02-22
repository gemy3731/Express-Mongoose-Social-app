import { Router } from "express";
import * as postController from './post.controller.ts'
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import uploadCloud from "../../middlewares/multerCloud.ts";
import validateSchema from "../../middlewares/validateSchema.ts";
import { commentSchema, postSchema } from "../../schemas/post.schema.ts";
const postRouter = Router();

postRouter.get('/',authMiddleware,postController.getPosts)
postRouter.get('/:id',authMiddleware, postController.getSinglePost)
postRouter.post('/',authMiddleware,uploadCloud().single('image'),validateSchema(postSchema), postController.createPost)
postRouter.post('/:id/comment',authMiddleware,validateSchema(commentSchema) ,postController.createComment)

export default postRouter;