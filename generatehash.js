import bcrypt from 'bcrypt';

const password = 'Adam123'; // Replace with the actual password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        // Remove any backslashes from the generated hash
        const sanitizedHash = hash.replace(/\\/g, '');
        console.log('Generated hash:', sanitizedHash);
    }
});