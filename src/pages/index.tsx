import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Expense Tracker
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Track your expenses easily and manage your budget effectively.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/login"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
