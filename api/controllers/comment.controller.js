import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/error.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to create a comment"));
    }

    const newComment = new Comment({
      content,
      postId,
      userId
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    // console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment Not found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();

    res.status(200).json(comment);

  } catch (error) {
    next(error);
  }
}

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this comment'));
    }

    const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
      content: req.body.content
    },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment cannot be found'));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'you are not allowed to delete the comment'));
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted Successfully!');
  } catch (error) {
    next(error);
  }
}

// export const getcomments = async (req, res, next) => {
//   console.log("getcomments");
//   if (!req.user.isAdmin) return next(errorHandler(403, 'You are not allowed to get all comments'));
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sortDirection || 'desc';
//     const allcomments = await Comment.find().sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);
//     console.log(allcomments);
//     res.status(200).json(allcomments);
//   } catch (error) {
//     next(error);
//   }
// }