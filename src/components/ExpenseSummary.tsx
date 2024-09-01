import React from 'react';

interface ExpenseSummaryProps {
  totalExpenses: number;
  numberOfExpenses: number;
  averageExpense: string;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totalExpenses,
  numberOfExpenses,
  averageExpense,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Expense Summary
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-gray-600">Total Amount</th>
            <th className="px-6 py-3 text-left text-gray-600">
              Number of Expenses
            </th>
            <th className="px-6 py-3 text-left text-gray-600">
              Average Expense
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-gray-800">
              LKR {totalExpenses.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-gray-800">{numberOfExpenses}</td>
            <td className="px-6 py-4 text-gray-800">LKR {averageExpense}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseSummary;
