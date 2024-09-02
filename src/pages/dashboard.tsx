import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useExpenses } from '../hooks/useExpenses';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { data: expenses } = useExpenses();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-0">
        <Dashboard expenses={expenses || []} />
      </main>
    </div>
  );
}
