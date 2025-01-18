import React, { useState } from 'react';
import { FaChartLine, FaCog, FaHistory, FaMoon, FaSignOutAlt, FaSun, FaWallet, FaHome, FaExchangeAlt } from 'react-icons/fa'; // Added icons
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <aside className="w-64 bg-blue-600 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-blue-500">
                WalletApp
            </div>
            <nav className="flex-grow">
                <ul className="space-y-4 p-4">
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaHome />
                        <Link to="dashboard" className="block">Dashboard</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaWallet />
                        <Link to="accounts" className="block">Accounts</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaExchangeAlt />
                        <Link to="transactions" className="block">Transactions</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaHistory />
                        <a href="#analytics" className="block">Analytics</a>
                    </li>
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaCog />
                        <a href="#settings" className="block">Settings</a>
                    </li>
                    <li className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
                        <FaSignOutAlt />
                        <a href="#logout" className="block">Logout</a>
                    </li>
                </ul>
            </nav>
            <div className="p-4">
                <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-500 p-2 rounded hover:bg-blue-700"
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                    <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
