import { useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../hooks/useAuth';
import CommonPopup from '@/components/CommonPopup';

interface ApiError {
  response?: {
    data?: {
      error: string;
    };
  };
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response?.data?.error) {
        setErrorMessage(response.data.error);
        setPopupVisible(true);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.response?.data?.error) {
        setErrorMessage(apiError.response.data.error);
        setPopupVisible(true);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-4 sm:mx-auto relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
        {popupVisible && (
          <CommonPopup
            message={errorMessage || ''}
            isVisible={popupVisible}
            onClose={() => setPopupVisible(false)}
          />
        )}
      </div>
    </div>
  );
}
