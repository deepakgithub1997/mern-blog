import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import { createSlug } from '../utils/create-slug.js';

export const create = async (req, res, next) => {
  const { title, content } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fileds'));
  }
  try {
    const invalidTitle = Post.findOne({ title });
    if (invalidTitle) {
      return next(errorHandler(400, 'Title should be unique'));
    }
  } catch (error) {
    console.log(error);
  }
  const slug = createSlug(req.body.title);
  console.log(slug);
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
} 