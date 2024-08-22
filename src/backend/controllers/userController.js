import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { insertBroker, getAllBrokers, updateBrokerToken } from '../models/brokers.js';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await insertBroker(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerBroker = async (req, res) => {
    const { firstName, lastName, email, password, phone_number } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const broker = await insertBroker(firstName, lastName, email, hashedPassword, phone_number);

        // Generate JWT token
        const token = jwt.sign({ id: broker.id, email: broker.email }, JWT_SECRET, { expiresIn: '1h' });

        // Update broker with token
        await updateBrokerToken(broker.id, token);

        res.status(201).json({ message: 'Broker registered successfully', broker, token });
    } catch (error) {
        console.error('Error registering broker:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBrokers = async (req, res) => {
    try {
        const brokers = await getAllBrokers();
        res.status(200).json(brokers);
    } catch (error) {
        console.error('Error fetching brokers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};