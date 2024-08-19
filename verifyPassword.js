import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const password = process.argv[2]; // Pass the password as a command-line argument
const hashedPassword = process.env.NOAH_PASSWORD;

if (!password) {
    console.error('Please provide a password to verify.');
    process.exit(1);
}

bcrypt.compare(password, hashedPassword, function(err, result) {
    if (err) {
        console.error('Error verifying password:', err);
    } else {
        console.log('Password match:', result);
    }
});