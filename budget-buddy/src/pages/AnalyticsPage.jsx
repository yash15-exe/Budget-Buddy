import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { getTokenFromCookie } from '../../../backend/utilities/cookie';

function AnalyticsPage() {
  const [financeRecords, setFinanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const token = getTokenFromCookie();

  useEffect(() => {
    fetchFinanceRecords();
  }, []);

  const fetchFinanceRecords = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/data/getFinanceData',
        { username: user.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFinanceRecords(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch finance records');
      setLoading(false);
    }
  };

  // Filter data for expenditure and income
  const expenditureData = financeRecords.filter((record) => record.transactionType === 'Expenditure');
  const incomeData = financeRecords.filter((record) => record.transactionType === 'Income');

  // Aggregate total transactions
  const totalExpenditure = expenditureData.reduce((acc, record) => acc + parseFloat(record.transactionAmount.$numberDecimal), 0);
  const totalIncome = incomeData.reduce((acc, record) => acc + parseFloat(record.transactionAmount.$numberDecimal), 0);

  // Chart data structure, parsing Decimal128 to number
  const expenditureChartData = expenditureData.map((record) => ({
    date: new Date(record.transactionDate).toLocaleDateString(),
    amount: parseFloat(record.transactionAmount.$numberDecimal), // Convert Decimal128 to number
  }));

  const incomeChartData = incomeData.map((record) => ({
    date: new Date(record.transactionDate).toLocaleDateString(),
    amount: parseFloat(record.transactionAmount.$numberDecimal), // Convert Decimal128 to number
  }));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Finance Records Analytics</h2>
      
      {/* Combined Bar Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Combined Transactions</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={[{ type: 'Expenditure', amount: totalExpenditure }, { type: 'Income', amount: totalIncome }]}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expenditure Line Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Expenditure Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={expenditureChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Income Line Chart */}
      <div>
        <h3 className="text-xl font-bold mb-2">Income Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={incomeChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsPage;
