import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        
        const { firstName, lastName, email, password, type, image } = req.body;

        if (!firstName || !lastName || !email || !password || !type || !image) {
            return res.status(400).json({ 
                message: "All fields are required",
                required: {
                    firstName: !firstName ? "missing" : "received",
                    lastName: !lastName ? "missing" : "received",
                    email: !email ? "missing" : "received",
                    password: !password ? "missing" : "received",
                    type: !type ? "missing" : "received",
                    image: !image ? "missing" : "received"
                }
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashedPassword',hashedPassword);
        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            type,
            image
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                type: newUser.type,
                image: newUser.image
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add debug logging
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(password, user.password);
        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Ensure JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Create and assign token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                type: user.type 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Logged in successfully",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type,
                image: user.image
            }
        });

    } catch (error) {
        console.error('Login error:', error);  // Add detailed error logging
        res.status(500).json({ 
            message: "Error logging in", 
            error: error.message,
            details: process.env.JWT_SECRET ? 'JWT_SECRET exists' : 'JWT_SECRET is missing'
        });
    }
}; 