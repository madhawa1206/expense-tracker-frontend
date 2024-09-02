import { useState, useEffect } from 'react';
import ExpenseTable from '../components/ExpenseTable';
import EditExpensePopup from '../components/EditExpensePopup';
import { api } from '../utils/api';
import { Expense } from '../types/expense';
import Navbar from '@/components/Navbar';
import Spinner from './Spinner';
import CommonPopup from './CommonPopup';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [popupVisible, setPopupVisible] = useState<boolean | null>(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses');
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to fetch expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleSave = async (updatedExpense: Expense) => {
    try {
      const response = await api.put(
        `/expenses/${updatedExpense._id}`,
        updatedExpense
      );
      if (response?.data.error) {
        setErrorMessage(response?.data.error);
        setPopupVisible(true);
      } else {
        setExpenses(
          expenses.map((expense) =>
            expense._id === updatedExpense._id ? updatedExpense : expense
          )
        );
      }
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  if (loading)
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Expense List</h1>
        <ExpenseTable
          expenses={expenses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      {editingExpense && (
        <EditExpensePopup
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleSave}
        />
      )}
      {popupVisible && (
        <CommonPopup
          message={errorMessage || ''}
          isVisible={popupVisible}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>
  );
};

export default ExpensesPage;
