import bcrypt from 'bcrypt';

const password = process.argv[2]; // Pass the password as a command-line argument
const saltRounds = 10;

if (!password) {
    console.error('Please provide a password to hash.');
    process.exit(1);
}

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        console.log('Generated hash:', hash);
    }
});