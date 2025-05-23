import axios from "axios";
import { json } from "@remix-run/node";
import { useLoaderData} from "@remix-run/react";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loader = async () => {
  const [transactionsRes, settingRes] = await Promise.all([
    axios.get(`${API_BASE_URL}cashback/transactions/`),
    axios.get(`${API_BASE_URL}cashback/settings/1/`),
  ]);

  const transactions = transactionsRes.data;
  const setting = settingRes.data;

  const totalIssued = transactions.reduce((sum, t) => sum + parseFloat(t.cashback_amount), 0);
  const pending = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + parseFloat(t.cashback_amount), 0);
  const redeemed = transactions
    .filter((t) => t.status === "redeemed")
    .reduce((sum, t) => sum + parseFloat(t.cashback_amount), 0);

  return json({ transactions, setting, totalIssued, pending, redeemed });
};


export default function Dashboard() {
  const { transactions, setting, totalIssued, pending, redeemed } = useLoaderData();
  const [isActive, setIsActive] = useState(setting.is_active);
  const [loading, setLoading] = useState(false);

  const toggleCashback = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`${API_BASE_URL}cashback/settings/${setting.id}/`, {
        is_active: !isActive,
      });
      setIsActive(response.data.is_active);
    } catch (error) {
      console.error("Failed to toggle cashback status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <h2 className="font-semibold">Total Issued</h2>
          <p className="text-green-600">₹{totalIssued.toFixed(2)}</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Pending</h2>
          <p className="text-yellow-600">₹{pending.toFixed(2)}</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Redeemed</h2>
          <p className="text-blue-600">₹{redeemed.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Cashback Campaign</h2>
          <p className="text-sm text-gray-600">Enable or disable cashback functionality</p>
        </div>
        <button
          onClick={toggleCashback}
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${
            isActive ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Updating..." : isActive ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Cashback Transactions</h2>
        <table className="w-full border rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Order Amount</th>
              <th className="p-2 border">Cashback</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.order_id} className="border-t">
                <td className="p-2 border">{tx.order_id}</td>
                <td className="p-2 border">₹{parseFloat(tx.order_amount).toFixed(2)}</td>
                <td className="p-2 border">₹{parseFloat(tx.cashback_amount).toFixed(2)}</td>
                <td className="p-2 border capitalize">{tx.status}</td>
                <td className="p-2 border">{new Date(tx.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}