import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex`}>
            <Sidebar />

            <main className="flex-grow p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
