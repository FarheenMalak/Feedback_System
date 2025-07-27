import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen p-0">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
