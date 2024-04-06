import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import { createSlug } from '../utils/create-slug.js';

export const create = async (req, res, next) => {
  const { title } = req.body;
  if (!req.user.isAdmin) {
    return next(errorHandler(200, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(200, 'Please provide all required fileds'));
  }
  try {
    const validTitle = await Post.findOne({ title });
    if (validTitle) {
      return next(errorHandler(400, 'Title should be Unique'));
    }
  } catch (error) {
    console.log(error);
  }
  const slug = createSlug(req.body.title);
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

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
}

export const deletepost = async (req, res, next) => {
  console.log(req.params.userId);
  console.log(req.user.id);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete the post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
}

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update the post'));
  }

  try {
    console.log(req.params.postId);
    const updatepost = await Post.findByIdAndUpdate(req.params.postId, {
      $set: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
      },
    }, { new: true });
    res.status(200).json(updatepost);

  } catch (error) {
    next(error);
  }
}