import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { createNewAccount, getAccounts } from "../utils/requests/accountRequests";
import { ToastContainer, toast } from "react-toastify";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAccount, setNewAccount] = useState({ name: "", accNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const accountsPerPage = 5;

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setIsLoading(true);
                const response = await getAccounts();
                setAccounts(response.accounts);
            } catch (error) {
                toast.error("Failed to fetch accounts. Please try again.", { position: "top-center" });
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const validateInputs = () => {
        const newErrors = {};
        if (!newAccount.name.trim()) newErrors.name = "Account name is required.";
        if (!newAccount.accNumber.trim()) newErrors.accNumber = "Account number is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddAccount = async () => {
        if (validateInputs()) {
            try {
                const response = await createNewAccount({
                    name: newAccount.name,
                    accNumber: newAccount.accNumber,
                });
                setAccounts((prevAccounts) => [...prevAccounts, response.account]);
                setNewAccount({ name: "", accNumber: "" });
                setShowModal(false);
                toast.success("Account added successfully!", { position: "top-center" });
            } catch (error) {
                toast.error("Failed to add account. Please try again.", { position: "top-center" });
            }
        } else {
            toast.error("Please correct the errors before submitting.", { position: "top-center" });
        }
    };

    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);
    const totalPages = Math.ceil(accounts.length / accountsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Accounts</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Account
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse h-12 bg-gray-300 rounded-lg"
                            ></div>
                        ))}
                </div>
            ) : accounts.length === 0 ? (
                <div>No transactions found.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-md rounded-lg mb-6">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">Account Name</th>
                                    <th className="py-3 px-4 text-left">Account Number</th>
                                    <th className="py-3 px-4 text-left">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAccounts.map((account, key) => (
                                    <tr key={key} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-4">{++key}</td>
                                        <td className="py-3 px-4">{account.name}</td>
                                        <td className="py-3 px-4">{account.accNumber}</td>
                                        <td className="py-3 px-4">
                                            {account.balance.toLocaleString()} RWF
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center space-x-4 mb-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg ${currentPage === 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-800">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-2xl font-bold mb-4 text-center">Add New Account</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Account Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={newAccount.name}
                                onChange={(e) =>
                                    setNewAccount({ ...newAccount, name: e.target.value })
                                }
                                className={`w-full px-4 py-2 border rounded-lg ${errors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-400"
                                    }`}
                                placeholder="Enter account name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accNumber" className="block text-sm font-medium mb-1">
                                Account Number
                            </label>
                            <input
                                type="text"
                                id="accNumber"
                                value={newAccount.accNumber}
                                onChange={(e) =>
                                    setNewAccount({ ...newAccount, accNumber: e.target.value })
                                }
                                className={`w-full px-4 py-2 border rounded-lg ${errors.accNumber
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-400"
                                    }`}
                                placeholder="Enter account number"
                            />
                            {errors.accNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.accNumber}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddAccount}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounts;
