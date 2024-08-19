import { query } from '../config/db.js';
import bcrypt from 'bcrypt';

const insertUser = async (username, password, isAdmin = false) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const text = 'INSERT INTO public.users (username, password, is_admin, created_at) VALUES ($1, $2, $3, NOW())';
    const values = [username, hashedPassword, isAdmin];
    try {
        await query(text, values);
        console.log('User inserted successfully');
    } catch (err) {
        console.error('Error inserting user:', err);
    }
};

export default insertUser;