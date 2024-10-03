import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      setMessage({ type: 'success', text: 'Registration successful!' });
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center p-6 bg-[#8B4513]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jpdlogo-ibGxnX9uISaA9Y9RF1G8XvGm5QASK8.jpg"
          alt="Corriente Magisterial Juan Pablo Duarte Logo"
          className="w-full mb-8 rounded-lg shadow-md"
        />
          <h2 className="text-2xl font-bold text-white">Register</h2>
          <p className="text-[#FFA500]">Join Corriente Magisterial Juan Pablo Duarte</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#8B4513] mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#A0522D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#8B4513] mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#A0522D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#8B4513] mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#A0522D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#8B4513] mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#A0522D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && (
          <div className={`p-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}