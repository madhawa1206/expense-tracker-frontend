import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Expense } from '../types/expense';

export const useExpenses = () => {
  const [data, setData] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async (expense: Omit<Expense, '_id'>) => {
    try {
      const response = await api.post('/expenses', expense);
      fetchExpenses();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const filterExpenses = async (
    dateFrom: string,
    dateTo: string
  ): Promise<Expense[]> => {
    try {
      const response = await api.get(`/expenses/filter/${dateFrom}/${dateTo}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getSummary = () => {
    const totalAmount = data.reduce((sum, expense) => sum + expense.amount, 0);
    const summaryByType = data.reduce(
      (summary, expense) => {
        if (!summary[expense.type]) {
          summary[expense.type] = 0;
        }
        summary[expense.type] += expense.amount;
        return summary;
      },
      {} as Record<string, number>
    );

    return {
      totalAmount,
      summaryByType,
    };
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { data, addExpense, filterExpenses, getSummary };
};
