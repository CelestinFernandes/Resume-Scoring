import bcryptjs from 'bcryptjs';
import User from '../models/User.model.js';  // Correct path to the User model

export const signup = async (req, res, next) => {
    console.log('Signup request body:', req.body); // Debugging the request body

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' }); // Ensure proper JSON response
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Return a successful response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' }); // Ensure proper error message
    }
};
