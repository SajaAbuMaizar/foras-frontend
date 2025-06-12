'use client';

import { useState } from 'react';
import { FaLock, FaLongArrowAltRight, FaPhone } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form action="/admin/login" method="post" className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 pb-6">
        Member Login
      </h2>

      <div className="relative">
        <input
          type="phone"
          name="phone"
          placeholder="Phome Number"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-14 py-3 rounded-full bg-gray-200 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaPhone />
        </span>
      </div>

      <div className="relative">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-14 py-3 rounded-full bg-gray-200 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaLock />
        </span>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-gray-800 text-white uppercase rounded-full px-6 py-3 w-full transition-all duration-300 font-bold"
        >
          Login
        </button>
      </div>

      <div className="text-center pt-4 text-sm text-gray-600">
        <span>Forgot </span>
        <a href="#" className="text-green-600 hover:text-green-800 underline">
          Username / Password?
        </a>
      </div>

      <div className="text-center pt-12">
        <a href="#" className="text-gray-700 hover:text-green-600 inline-flex items-center space-x-2">
          <span>Need Help</span>
          <FaLongArrowAltRight />
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
