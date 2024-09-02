import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../utils/api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import CommonPopup from '@/components/CommonPopup';
import Link from 'next/link';

const validatePassword = (password: string) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;

  return {
    length: password.length >= minLength,
    number: hasNumber.test(password),
    upperCase: hasUpperCase.test(password),
    lowerCase: hasLowerCase.test(password),
  };
};

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    upperCase: false,
    lowerCase: false,
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPopupMessage('Passwords do not match');
      setPopupVisible(true);
      return;
    }
    if (!Object.values(passwordValidation).every(Boolean)) {
      setPopupMessage('Password does not meet the strength requirements');
      setPopupVisible(true);
      return;
    }
    try {
      await api.post('/auth/register', { username, password });
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidation(validatePassword(newPassword));
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 top-6"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              ) : (
                <EyeSlashIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 top-6"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              ) : (
                <EyeSlashIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <div className="mb-4 text-sm text-gray-600">
            <p
              className={`text-${passwordValidation.length ? 'blue' : 'red'}-500`}
            >
              - Minimum length of 8 characters
            </p>
            <p
              className={`text-${passwordValidation.number ? 'blue' : 'red'}-500`}
            >
              - Includes at least one number
            </p>
            <p
              className={`text-${passwordValidation.upperCase ? 'blue' : 'red'}-500`}
            >
              - Includes at least one uppercase letter
            </p>
            <p
              className={`text-${passwordValidation.lowerCase ? 'blue' : 'red'}-500`}
            >
              - Includes at least one lowercase letter
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
      <CommonPopup
        message={popupMessage}
        isVisible={popupVisible}
        onClose={handlePopupClose}
      />
    </div>
  );
}
