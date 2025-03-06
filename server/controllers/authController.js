import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, type, image } = req.body;
  console.log(req.body);
  
  try {
    // Check for required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user with hashed password
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'user',
      type,
      image,
    });

    // Return user without password
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        type: newUser.type,
        image: newUser.image
      } 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 