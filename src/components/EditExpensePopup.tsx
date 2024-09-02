import { useState, useEffect } from 'react';
import { Expense } from '../types/expense';

interface EditExpensePopupProps {
  expense: Expense | null;
  onClose: () => void;
  onSave: (updatedExpense: Expense) => void;
}

const EditExpensePopup = ({
  expense,
  onClose,
  onSave,
}: EditExpensePopupProps) => {
  const [updatedExpense, setUpdatedExpense] = useState<Expense>(expense!);

  useEffect(() => {
    if (expense) {
      setUpdatedExpense(expense);
    }
  }, [expense]);

  if (!expense) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedExpense({
      ...updatedExpense,
      [name]: name === 'amount' ? parseFloat(value) : value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isoDate = new Date(value).toISOString();
    setUpdatedExpense({
      ...updatedExpense,
      [name]: isoDate,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedExpense);
    onClose();
  };

  const formattedDate = new Date(updatedExpense.date)
    .toISOString()
    .substring(0, 10);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={updatedExpense.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formattedDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={updatedExpense.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={updatedExpense.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              step="0.01"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpensePopup;
