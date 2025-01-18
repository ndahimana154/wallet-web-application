import React from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../utils/requests/authRequests";
function WalletApp() {
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await userLogin({ email, password });
            if (response.status === 200) {
                toast.success("Login successful!", { position: "top-center" });
                localStorage.setItem("token", response.token);
                localStorage.setItem("tokenTimestamp", Date.now());
                navigate("/user/dashboard")
            } else {
                toast.error(response.message || "Invalid credentials", {
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <ToastContainer />

            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">WalletApp</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#features" className="hover:text-gray-300">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#support" className="hover:text-gray-300">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-gray-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Login to WalletApp
                    </h2>
                    <form method="POST" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} WalletApp. All Rights Reserved.
                    </p>
                    <p className="text-sm">
                        <a href="#terms" className="hover:underline">
                            Terms of Service
                        </a>{" "}
                        |{" "}
                        <a href="#privacy" className="hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default WalletApp;
