import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });



    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO Functionality will go here 

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

  } catch (error) {
    next(error);
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { id: userToChatId } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    next(error);
  }
}
