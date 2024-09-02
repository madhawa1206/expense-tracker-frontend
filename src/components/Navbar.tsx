import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faPlusCircle,
  faClipboardList,
  faSignOutAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white min-h-screen flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white flex flex-col justify-between ${isOpen ? 'block' : 'hidden'} md:flex`}
      >
        <div className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700 flex items-center">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 flex items-center">
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              <Link href="/add-expense">Add Expense</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 flex items-center">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              <Link href="/expenses">Expenses</Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <ul>
            <li className="p-4 bg-red-600 hover:bg-red-700 flex items-center">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <a href="#" onClick={logout} className="w-full text-left">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
