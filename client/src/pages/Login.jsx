import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/'); // Redirect to home or dashboard after login
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f3f5] flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f2638] py-6 px-8 flex justify-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Lumina Logo" className="h-12 object-contain" />
            <div className="text-white">
              <span className="block text-xl font-bold leading-tight">Lumina</span>
              <span className="block text-xl font-bold leading-tight">University</span>
            </div>
          </Link>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#0f2638] mb-2 text-center">Student Portal Login</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Access your student account and resources</p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0f2638] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                placeholder="student@lumina.ac.uk"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[#0f2638]" htmlFor="password">
                  Password
                </label>
                <Link to="#" className="text-sm text-[#005580] hover:text-[#7ae0f5] font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#fbd135] hover:bg-[#eab308] text-[#0f2638] font-bold rounded-md transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have a student account yet?{' '}
            <Link to="/register" className="text-[#005580] font-bold hover:text-[#7ae0f5] transition-colors">
              Apply Now / Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
