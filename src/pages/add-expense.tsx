import { useState } from 'react';
import { useRouter } from 'next/router';
import { useExpenses } from '../hooks/useExpenses';
import Navbar from '../components/Navbar';
import CommonPopup from '@/components/CommonPopup';

export default function AddExpense() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const router = useRouter();
  const { addExpense } = useExpenses();
  const [errorMessage, setErrorMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount === '' || amount < 0) {
      setErrorMessage('Please enter a valid amount');
      setPopupVisible(true);
      return;
    }

    const response = await addExpense({
      description,
      date,
      type,
      amount: Number(amount),
    });

    if (response?.data.error) {
      setErrorMessage(response?.data.error);
      setPopupVisible(true);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Expense
          </button>
        </form>
        {popupVisible && (
          <CommonPopup
            message={errorMessage || ''}
            isVisible={popupVisible}
            onClose={() => setPopupVisible(false)}
          />
        )}
      </main>
    </div>
  );
}
