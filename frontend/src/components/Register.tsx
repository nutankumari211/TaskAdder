import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { RegisterCredentials } from '../types';
import toast from 'react-hot-toast';

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      login(response.token, response.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-stretch bg-gradient-to-br from-white via-blue-200 to-blue-800 relative overflow-hidden">
      {/* Top: Logo and marketing text (always visible, stacked on mobile) */}
      <div className="flex flex-col justify-start items-start w-full md:w-1/2 px-6 pt-8 md:px-12 md:pt-10">
        <img src="logo.png" alt="Logo" className="h-16 md:h-20 mb-6 md:mb-8 mx-auto md:mx-0" />
        <h1 className="hidden md:block text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-black text-left md:text-left w-full">Join 1000<sup>+</sup> Businesses<br/><span className="text-yellow-300">Powering Growth with Lemonpay!</span></h1>
        <p className="hidden md:block text-base md:text-lg text-gray-800 mb-4 md:mb-0 w-full">Your success is our focus</p>
      </div>
      {/* Bottom/Right: Signup form */}
      <div className="flex flex-1 items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 text-left">Welcome Sign Up System</h2>
          <p className="text-left text-white text-base mb-8">Your gateway to seamless transactions and easy payments.</p>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`w-full rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 text-white placeholder-white placeholder-opacity-70 py-2 px-4 outline-none transition ${errors.email ? 'border-red-400' : ''}`}
                placeholder="maildev@lemonpay.tech"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className={`w-full rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 text-white placeholder-white placeholder-opacity-70 py-2 px-4 pr-16 outline-none transition ${errors.password ? 'border-red-400' : ''}`}
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-white opacity-70 hover:opacity-100 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className={`w-full rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 text-white placeholder-white placeholder-opacity-70 py-2 px-4 outline-none transition ${errors.confirmPassword ? 'border-red-400' : ''}`}
                placeholder="Min 6 characters"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: undefined });
                }}
              />
              {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-white bg-white bg-opacity-20 focus:ring-yellow-300"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <Link to="/login" className="text-white text-sm hover:underline opacity-80 hover:opacity-100">Sign In</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 rounded-md transition-colors mt-2 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      {/* Decorative circles for background */}
      <div className="absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 bg-white bg-opacity-10 rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-56 h-56 md:w-80 md:h-80 bg-white bg-opacity-10 rounded-full pointer-events-none" />
    </div>
  );
};

export default Register; 