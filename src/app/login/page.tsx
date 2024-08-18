"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const authenticateUser = async (username: string, password: string) => {
    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'password') {
        return true;
    }
    return false;
};

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const isAuthenticated = await authenticateUser(username, password);
        if (isAuthenticated) {
            router.push('/admin'); // Redirect to admin page on successful login
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;