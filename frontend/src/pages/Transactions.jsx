import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { createTransaction, getTransactions } from "../utils/requests/transactionRequests";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi";
import { getAccounts } from "../utils/requests/accountRequests";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const transactionsPerPage = 15;

    const transactionSchema = Joi.object({
        type: Joi.string()
            .valid("Withdraw", "Deposit")
            .required()
            .messages({
                "any.only": "Type must be either 'Withdraw' or 'Deposit'.",
                "string.empty": "Type is required.",
            }),
        account: Joi.string().required().messages({
            "string.empty": "Account is required.",
        }),
        amount: Joi.number().required().messages({
            "number.base": "Amount must be a number.",
            "number.empty": "Amount is required.",
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required.",
        }),
        category: Joi.string().required().messages({
            "string.empty": "Category is required.",
        }),
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await getTransactions();
                setTransactions(response.transactions || []);
            } catch (error) {
                toast.error("Failed to fetch transactions. Please try again.", {
                    position: "top-center",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransactions();

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

    // Validate inputs against schema
    const validateInputs = () => {
        const { error } = transactionSchema.validate(newTransaction, { abortEarly: false });
        if (!error) {
            setErrors({});
            return true;
        }

        const newErrors = {};
        error.details.forEach((err) => {
            newErrors[err.context.key] = err.message;
        });
        setErrors(newErrors);
        return false;
    };

    const handleAddTransaction = async () => {
        if (validateInputs()) {
            try {
                const response = await createTransaction(newTransaction);
                setTransactions((prev) => [...prev, response.transaction]);
                setNewTransaction({
                    type: "",
                    account: "",
                    amount: "",
                    description: "",
                    category: "",
                });
                // setShowModal(false);
                toast.success("Transaction added successfully!", { position: "top-center" });
            } catch (error) {
                toast.error("Failed to add transaction. Please try again.", { position: "top-center" });
            }
        } else {
            toast.error("Please correct the errors before submitting.", { position: "top-center" });
        }
    };
    const accountsPerPage = 15;

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Transaction
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {Array(accountsPerPage)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse h-12 bg-gray-300 rounded-lg"
                            ></div>
                        ))}
                </div>
            ) : transactions.length === 0 ? (
                <div>No transactions found.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-md rounded-lg mb-6">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">Type</th>
                                    <th className="py-3 px-4 text-left">Account</th>
                                    <th className="py-3 px-4 text-left">Amount</th>
                                    <th className="py-3 px-4 text-left">Old balance</th>
                                    <th className="py-3 px-4 text-left">New Balance</th>
                                    <th className="py-3 px-4 text-left">Description</th>
                                    <th className="py-3 px-4 text-left">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTransactions.map((transaction, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{transaction.type}</td>
                                        <td className="py-3 px-4">{transaction.account.name}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block py-1 px-2 rounded-lg text-white font-bold ${transaction.type === "Deposit" ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            >
                                                {transaction.type === "Deposit" ? `+${transaction.amount.toLocaleString()}` : `-${transaction.amount.toLocaleString()}`} RWF
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{transaction.oldAccBalance.toLocaleString()}RWF</td>
                                        <td className="py-3 px-4">{transaction.newAccBalance.toLocaleString()}RWF</td>
                                        <td className="py-3 px-4">{transaction.description}</td>
                                        <td className="py-3 px-4">{transaction.category}</td>
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
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
                        <div className="mb-4">
                            <label>Type</label>
                            <select
                                value={newTransaction.type}
                                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="">Select Type</option>
                                <option value="Withdraw">Withdraw</option>
                                <option value="Deposit">Deposit</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Account</label>
                            <select
                                value={newTransaction.account}
                                onChange={(e) => setNewTransaction({ ...newTransaction, account: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                {accounts.map((account) => (
                                    <option key={account.id} value={account._id}>{account.name}</option>
                                ))}
                            </select>
                            {errors.account && <p className="text-red-500 text-sm">{errors.account}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Amount</label>
                            <input
                                type="number"
                                value={newTransaction.amount}
                                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Description</label>
                            <input
                                type="text"
                                value={newTransaction.description}
                                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Category</label>
                            <input
                                type="text"
                                value={newTransaction.category}
                                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTransaction}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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

export default Transactions;
