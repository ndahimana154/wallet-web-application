import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/user/dashboard"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
