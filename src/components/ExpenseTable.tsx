import { useState } from 'react';
import { Expense } from '../types/expense';
import ConfirmationDialog from './ConfirmationDialog';

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseTable = ({ expenses, onDelete, onEdit }: ExpenseTableProps) => {
  const [filter, setFilter] = useState({ name: '', type: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: '', direction: 'asc' });

  const itemsPerPage = 10;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
    setIsDialogOpen(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setIsDialogOpen(false);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key === 'description') {
      return sortConfig.direction === 'asc'
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    }
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter((expense) => {
    return (
      (!filter.name ||
        expense.description
          .toLowerCase()
          .includes(filter.name.toLowerCase())) &&
      (!filter.type ||
        expense.type.toLowerCase().includes(filter.type.toLowerCase())) &&
      (!filter.date ||
        new Date(expense.date).toLocaleDateString().includes(filter.date))
    );
  });

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4">
      <div className="flex flex-col sm:flex-row mb-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by Description"
          value={filter.name}
          onChange={handleFilterChange}
          className="w-full sm:w-1/3 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Filter by Type"
          value={filter.type}
          onChange={handleFilterChange}
          className="w-full sm:w-1/3 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="date"
          placeholder="Filter by Date"
          value={filter.date}
          onChange={handleFilterChange}
          className="w-full sm:w-1/3 px-3 py-2 border rounded"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort('description')}
            >
              Description{' '}
              {sortConfig.key === 'description' &&
                (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort('date')}
            >
              Date{' '}
              {sortConfig.key === 'date' &&
                (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedExpenses.length > 0 ? (
            paginatedExpenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{expense.description}</td>
                <td className="px-4 py-2">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{expense.type}</td>
                <td className="px-4 py-2">{expense.amount.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => onEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() =>
                        handleDeleteClick(expense._id ? expense._id : '')
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isDialogOpen && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message="Are you sure you want to delete this expense?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
