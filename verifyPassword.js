// verifyPassword.js
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const password = 'Adam123';
const hashedPassword = process.env.XP_12_PASSWORD;

if (!hashedPassword) {
    console.error('XP_12_PASSWORD environment variable is not set');
    process.exit(1);
}

bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
        console.error('Error comparing password:', err);
        process.exit(1);
    }

    if (result) {
        console.log('Password matches the hash');
    } else {
        console.log('Password does not match the hash');
    }
});