// client/src/loginForm.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from './useContext';
import { useNavigate } from 'react-router-dom';

export default function FormPage() {
  const { setFormData: setGlobalFormData, setLocation: setGlobalLocation } = useContext(UserContext);
  const [localData, setLocalData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profession: '',
    age: '',
    about: '',
    gender: '',
  });

  const navigate = useNavigate();

  const getLocation = async () => {
    try {
      const res = await fetch('https://ipinfo.io/json?token=3889ac530c8876');
      const data = await res.json();
      const [latStr, lonStr] = data.loc.split(',');
      return { lat: Number(latStr), lon: Number(lonStr) };
    } catch (error) {
      console.error('Failed to get location:', error);
      return { lat: null, lon: null };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentLocation = await getLocation();

    // Save to context
    setGlobalFormData(localData);
    setGlobalLocation(currentLocation);

    // Call backend to send OTP
    try {
      const res = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localData.email, phone: localData.phone })
      });
      const result = await res.json();

      if (!result.success) {
        navigate(result.redirect || '/error');
      } else {
        // If backend returns OTP in dev mode it might include result.otp
        navigate(result.redirect || '/verification');
      }
    } catch (err) {
      console.error('send-otp failed', err);
      navigate('/error');
    }

    // clear local form (but keep global context)
    setLocalData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      profession: '',
      age: '',
      about: '',
      gender: '',
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        {/* Compact Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
            Create Your Profile
          </h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        {/* Main Form Card */}
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm flex-1 flex flex-col rounded-lg">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 border-b-2 rounded-t-lg">
            <h2 className="text-xl font-semibold text-center">Registration Form</h2>
          </div>

          <div className="p-6 flex-1 overflow-hidden">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">

              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-gray-700 font-medium text-sm">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    name="name"
                    onChange={handleChange}
                    value={localData.name}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-purple-200 focus:border-purple-500 h-10 px-3 rounded-md"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-gray-700 font-medium text-sm">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    name="email"
                    onChange={handleChange}
                    value={localData.email}
                    placeholder="your.email@example.com"
                    className="w-full border-2 border-blue-200 focus:border-blue-500 h-10 px-3 rounded-md"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-gray-700 font-medium text-sm">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    name="phone"
                    onChange={handleChange}
                    value={localData.phone}
                    placeholder="+1 (555) 123-4567"
                    className="w-full border-2 border-green-200 focus:border-green-500 h-10 px-3 rounded-md"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                {/* Password */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-gray-700 font-medium text-sm">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={localData.password}
                    minLength="6"
                    placeholder="Create a secure password"
                    className="w-full border-2 border-red-200 focus:border-green-500 h-10 px-3 rounded-md"
                  />
                </div>

                {/* Profession */}
                <div className="space-y-1">
                  <label htmlFor="profession" className="block text-gray-700 font-medium text-sm">Profession</label>
                  <input
                    id="profession"
                    type="text"
                    name="profession"
                    onChange={handleChange}
                    value={localData.profession}
                    placeholder="e.g., Software Engineer"
                    className="w-full border-2 border-teal-200 focus:border-teal-500 h-10 px-3 rounded-md"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label htmlFor="age" className="block text-gray-700 font-medium text-sm">Age</label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    onChange={handleChange}
                    value={localData.age}
                    min="14"
                    max="120"
                    placeholder="25"
                    className="w-full border-2 border-pink-200 focus:border-pink-500 h-10 px-3 rounded-md"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label htmlFor="gender" className="block text-gray-700 font-medium text-sm">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={localData.gender}
                    onChange={handleChange}
                    className="w-full border-2 border-indigo-200 focus:border-indigo-500 h-10 px-3 rounded-md"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 flex flex-col">
                {/* Address */}
                <div className="space-y-1 flex-1">
                  <label htmlFor="address" className="block text-gray-700 font-medium text-sm">Address</label>
                  <textarea
                    name="address"
                    onChange={handleChange}
                    value={localData.address}
                    id="address"
                    placeholder="Enter your complete address"
                    className="w-full border-2 border-orange-200 focus:border-orange-500 px-3 py-2 rounded-md h-20 resize-none"
                  ></textarea>
                </div>

                {/* About */}
                <div className="space-y-1 flex-1">
                  <label htmlFor="review" className="block text-gray-700 font-medium text-sm">Tell us about yourself</label>
                  <textarea
                    id="review"
                    name="about"
                    onChange={handleChange}
                    value={localData.about}
                    placeholder="Share your thoughts, experiences..."
                    className="w-full border-2 border-violet-200 focus:border-violet-500 px-3 py-2 rounded-md resize-none flex-1"
                    maxLength="500"
                  ></textarea>
                  <p className="text-xs text-gray-500">Maximum 500 characters</p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="h-12 text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-md"
                >
                  Create My Account
                </button>

                <p className="text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <a href="#" className="text-purple-600 hover:underline">Sign in here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
