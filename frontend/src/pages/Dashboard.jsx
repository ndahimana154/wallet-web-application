import React, { useState } from "react";
import Chart from "react-apexcharts";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [balance, setBalance] = useState(1245.67);


  const chartOptions = {
    options: {
      chart: { id: "wallet-analytics" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      theme: { mode: darkMode ? "dark" : "light" },
    },
    series: [
      { name: "Income", data: [400, 500, 600, 700, 800] },
      { name: "Expenses", data: [300, 400, 500, 400, 600] },
    ],
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Money
        </button>
      </header>

      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Wallet Balance */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold">Wallet Balance</h2>
          <p className="text-3xl text-blue-600 font-bold mt-2">${balance.toFixed(2)}</p>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <ul className="mt-2">
            <li className="flex justify-between text-sm border-b py-2">
              <span>Payment to ABC</span>
              <span className="text-green-600">+$250.00</span>
            </li>
            <li className="flex justify-between text-sm border-b py-2">
              <span>Purchase at Store</span>
              <span className="text-red-600">-$80.00</span>
            </li>
          </ul>
        </div>

        {/* Analytics */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-xl font-bold">Spending Analytics</h2>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="line"
            height="200"
          />
        </div>
      </section>

      {/* Recent Transactions Table */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-2">#12345</td>
              <td className="p-2 text-green-600">+$250.00</td>
              <td className="p-2">2025-01-15</td>
              <td className="p-2 text-green-500">Completed</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-2">#67890</td>
              <td className="p-2 text-red-600">-$80.00</td>
              <td className="p-2">2025-01-14</td>
              <td className="p-2 text-yellow-500">Pending</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
