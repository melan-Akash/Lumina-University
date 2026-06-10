import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AuthContext';
import { 
  AcademicCapIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1526] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#2a3a5a] text-white rounded-full mx-auto flex items-center justify-center mb-4">
            <AcademicCapIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">
            Lumina University
          </h2>
          <p className="mt-1.5 text-[15px] text-gray-500">
            Admin Login
          </p>
        </div>
        
        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md text-sm font-medium text-center">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-800 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0a1526] focus:border-[#0a1526] transition-colors"
                placeholder="admin@lumina.edu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0a1526] focus:border-[#0a1526] transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#0a1526] focus:ring-[#0a1526] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                Remember me
              </label>
            </div>
            <div className="text-xs">
              <a href="#" className="font-semibold text-[#0a1526] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#0a1526] hover:bg-[#152744] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a1526] transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-start justify-center gap-2 text-center text-gray-500">
            <ShieldCheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-tight max-w-[220px]">
              University staff only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center gap-6 mt-8 text-xs text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Help</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  );
};

export default AdminLogin;
