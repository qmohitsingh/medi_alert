import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username: ', username);
        console.log('Password: ', password);
    };

    return (
        <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-lg font-medium mb-4">Login</h1>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border border-gray-400 p-2 rounded-lg"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-400 p-2 rounded-lg"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
