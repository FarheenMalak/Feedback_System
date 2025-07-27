import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import authStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const store = authStore();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await store.login();

    // Check email and redirect accordingly
    if (store.loginForm.email === 'admin@gmail.com') {
      navigate('/admin-dashboard'); 
    } else {
      navigate('/'); 
    }

  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-lg w-full p-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              {/* Header */}
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#00b4db] to-[#0083b0] rounded-full flex items-center justify-center mb-4">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={store.updateLoginForm}
                value={store.loginForm.email}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                onChange={store.updateLoginForm}
                value={store.loginForm.password}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00b4db] to-[#0083b0] hover:from-[#00b4db] hover:to-[#056180] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
      <div className="bg-gray-100 border border-gray-200 mt-6 p-4 rounded-lg shadow-inner text-sm text-gray-700">
  <h3 className="font-semibold text-gray-900 mb-2">🔐 Admin Demo Credentials</h3>
  <p className="font-medium">Email: admin@gmail.com</p>
  <p className="font-medium">Password:admin@000</p>
  <p className="text-xs text-gray-500 mt-2">Use these credentials to login as admin and access the admin dashboard.</p>
</div>
    </div>
  );
};

export default LoginForm;
