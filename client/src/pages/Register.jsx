import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useUserAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setIsLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/'); // Redirect to home or dashboard after successful registration
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f3f5] flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f2638] py-6 px-8 flex flex-col items-center justify-center">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Lumina Logo" className="h-12 object-contain" />
            <div className="text-white">
              <span className="block text-xl font-bold leading-tight">Lumina</span>
              <span className="block text-xl font-bold leading-tight">University</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white text-center">Create an Account</h2>
          <p className="text-[#7ae0f5] text-center text-sm mt-1">Start your journey with Lumina today</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-[#0f2638] mb-2" htmlFor="name">
                Full Legal Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0f2638] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0f2638] mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0f2638] mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ae0f5] focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#0f2638] hover:bg-[#1a3850] text-white font-bold rounded-md transition-colors mt-4 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#005580] font-bold hover:text-[#7ae0f5] transition-colors">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
