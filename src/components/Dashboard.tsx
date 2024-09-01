import { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Expense } from '../types/expense';
import { useExpenses } from '../hooks/useExpenses';
import { startOfMonth, endOfMonth } from 'date-fns';
import PieChart from './PieChart';
import Spinner from './Spinner';
import ExpenseSummary from './ExpenseSummary';

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard = ({ expenses }: DashboardProps) => {
  const now = new Date();
  const [date, setDate] = useState<Date>(now);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { filterExpenses } = useExpenses();

  const fetchFilteredExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      if (date) {
        const from = startOfMonth(date).toISOString().split('T')[0];
        const to = endOfMonth(date).toISOString().split('T')[0];
        const filtered = await filterExpenses(from, to);
        setFilteredExpenses(filtered);
      } else {
        setFilteredExpenses(expenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchFilteredExpenses();
  }, [fetchFilteredExpenses]);

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const numberOfExpenses = filteredExpenses.length;
  const averageExpense = numberOfExpenses
    ? (totalExpenses / numberOfExpenses).toFixed(2)
    : '0.00';
  const maxExpense = 10000;
  const maxThreshold = 0.9;
  const alertThreshold = maxThreshold * maxExpense;

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Dashboard
        </h1>

        {totalExpenses >= alertThreshold && (
          <div className="bg-yellow-100 p-4 mb-6 text-yellow-800 rounded-lg border border-yellow-300">
            <span className="font-semibold">Warning:</span> You have reached{' '}
            {maxThreshold * 100}% of your monthly expense limit!
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date as Date)}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base"
            placeholderText="Select Month/Year"
            wrapperClassName="w-full md:w-1/2 lg:w-1/3"
          />
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg h-96">
            <PieChart data={filteredExpenses} />
          </div>
        </div>

        <ExpenseSummary
          totalExpenses={totalExpenses}
          numberOfExpenses={numberOfExpenses}
          averageExpense={averageExpense}
        />
      </div>
    </div>
  );
};

export default Dashboard;
