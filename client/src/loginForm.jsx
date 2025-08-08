import React, { useState } from 'react';
export default function FormPage() {
  const [location, setLocation] = useState({ lat: -1.0, lon: -1.0 });
  const [formData, setFormData] = useState({
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

  const getLocation = async () => {
    try {
      const res = await fetch('https://ipinfo.io/json?token=3889ac530c8876');
      const data = await res.json();
      const [lat, lon] = data.loc.split(',');
      return { lat, lon };
    } catch (error) {
      console.error('Failed to get location:', error);
      return { lat: 'N/A', lon: 'N/A' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentLocation = await getLocation(); // get coordinates
    setLocation(currentLocation); // set in state

    console.log('Form Data:', formData);
    console.log('Location:', currentLocation);

    setFormData({
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

    alert('Form submitted successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
                {/* Name Field */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-gray-700 font-medium text-sm">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-gray-700 font-medium text-sm">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="your.email@example.com"
                    className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-gray-700 font-medium text-sm">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="Number"
                    required
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    pattern="[+][0-9]{1,3} [0-9]{1,3} [0-9]{3}-[0-9]{4}"
                    placeholder="+1 (555) 123-4567"
                    className="w-full border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-gray-700 font-medium text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    type="string"
                    required
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    minLength="6"
                    maxLength="1024"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}"
                    placeholder="Create a secure password"
                    className="w-full border-2 border-red-200 focus:border-green-500 focus:ring-2 focus:ring-red-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>

                {/* Profession Field */}
                <div className="space-y-1">
                  <label htmlFor="profession" className="block text-gray-700 font-medium text-sm">
                    Profession
                  </label>
                  <input
                    id="profession"
                    type="text"
                    name="profession"
                    onChange={handleChange}
                    value={formData.profession}
                    placeholder="e.g., Software Engineer"
                    className="w-full border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-1">
                  <label htmlFor="age" className="block text-gray-700 font-medium text-sm">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    onChange={handleChange}
                    value={formData.age}
                    min="14"
                    max="120"
                    placeholder="25"
                    className="w-full border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors"
                  />
                </div>

                {/* Gender Field */}
                <div className="space-y-1">
                  <label htmlFor="gender" className="block text-gray-700 font-medium text-sm">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none h-10 px-3 rounded-md text-gray-800 transition-colors bg-white"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">others</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 flex flex-col">
                {/* Address Field */}
                <div className="space-y-1 flex-1">
                  <label htmlFor="address" className="block text-gray-700 font-medium text-sm">
                    Address
                  </label>
                  <textarea
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                    id="address"
                    placeholder="Enter your complete address"
                    className="w-full border-2 border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none px-3 py-2 rounded-md text-gray-800 resize-none h-20 transition-colors"
                  ></textarea>
                </div>

                {/* Review Field */}
                <div className="space-y-1 flex-1">
                  <label htmlFor="review" className="block text-gray-700 font-medium text-sm">
                    Tell us about yourself
                  </label>
                  <textarea
                    id="review"
                    name="about"
                    onChange={handleChange}
                    value={formData.about}
                    placeholder="Share your thoughts, experiences..."
                    className="w-full border-2 border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none px-3 py-2 rounded-md text-gray-800 resize-none flex-1 transition-colors"
                    maxLength="500"
                  ></textarea>
                  <p className="text-xs text-gray-500">Maximum 500 characters</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="h-12 text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Create My Account
                </button>

                {/* Footer Text */}
                <p className="text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
 /*
 require('dotenv').config();
fetch(`https://ipinfo.io/json?token=` + process.env.IPINFO_TOKEN)
  .then(res => res.json())
  .then(data => {
    const loc = data.loc.split(',');
    console.log('Approximate Latitude:', loc[0]);
    console.log('Approximate Longitude:', loc[1]);
  });

 */