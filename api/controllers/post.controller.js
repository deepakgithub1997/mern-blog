import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import { createSlug } from '../utils/create-slug.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fileds'));
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