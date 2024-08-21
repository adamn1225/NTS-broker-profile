import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // Assuming the token contains the user ID in the "id" field
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}