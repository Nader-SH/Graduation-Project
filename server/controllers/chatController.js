import { Chat, User, Donor } from '../models/index.js';

// Get all chats
export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.findAll({
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ],
            order: [['chatDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: chats.length,
            data: chats
        });
    } catch (error) {
        console.error('Error in getAllChats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching chats',
            error: error.message
        });
    }
};

// Get chat by ID
export const getChatById = async (req, res) => {
    try {
        const { id } = req.params;

        const chat = await Chat.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Check if user has permission to view this chat
        if (req.user.role !== 'admin' &&
            req.user.id !== chat.senderId &&
            req.user.id !== chat.receiveId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this chat'
            });
        }

        res.status(200).json({
            success: true,
            data: chat
        });
    } catch (error) {
        console.error('Error in getChatById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching chat',
            error: error.message
        });
    }
};

// Create new chat
export const createChat = async (req, res) => {
    try {
        const { text, receiveId } = req.body;
        const senderId = req.user.id; // Get sender ID from authenticated user

        // Check if receiver exists
        const receiver = await User.findByPk(receiveId);
        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: 'Receiver not found'
            });
        }

        // Create chat
        const chat = await Chat.create({
            text,
            senderId,
            receiveId,
            chatDate: new Date()
        });

        // Fetch the created chat with sender and receiver details
        const newChat = await Chat.findByPk(chat.id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Chat message sent successfully',
            data: newChat
        });
    } catch (error) {
        console.error('Error in createChat:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending chat message',
            error: error.message
        });
    }
};

// Update chat
export const updateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const chat = await Chat.findByPk(id);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Check if user has permission to update this chat
        if (req.user.role !== 'admin' && req.user.id !== chat.senderId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this chat'
            });
        }

        // Check if chat is too old to edit (e.g., 24 hours)
        const hoursSinceCreation = (new Date() - chat.chatDate) / (1000 * 60 * 60);
        if (hoursSinceCreation > 24 && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot edit messages older than 24 hours'
            });
        }

        await chat.update({ text });

        const updatedChat = await Chat.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Chat message updated successfully',
            data: updatedChat
        });
    } catch (error) {
        console.error('Error in updateChat:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating chat message',
            error: error.message
        });
    }
};

// Delete chat
export const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;

        const chat = await Chat.findByPk(id);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Check if user has permission to delete this chat
        if (req.user.role !== 'admin' && req.user.id !== chat.senderId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this chat'
            });
        }

        await chat.destroy();

        res.status(200).json({
            success: true,
            message: 'Chat message deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteChat:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting chat message',
            error: error.message
        });
    }
};

// Get chat history between two users
export const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;

        const chats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: currentUserId, receiveId: userId },
                    { senderId: userId, receiveId: currentUserId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ],
            order: [['chatDate', 'ASC']]
        });

        res.status(200).json({
            success: true,
            count: chats.length,
            data: chats
        });
    } catch (error) {
        console.error('Error in getChatHistory:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching chat history',
            error: error.message
        });
    }
};
