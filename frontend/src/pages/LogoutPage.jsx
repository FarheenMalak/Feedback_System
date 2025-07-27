import React, { useEffect } from 'react';
import authStore from '../stores/authStore';

const LogoutPage = () => {
  const store = authStore();

  useEffect(() => {
    store.logout();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-red-600">You are now logged out</h1>
        <p className="text-gray-600 mt-2">Thank you for visiting. Come back soon!</p>
      </div>
    </div>
  );
};

export default LogoutPage;
