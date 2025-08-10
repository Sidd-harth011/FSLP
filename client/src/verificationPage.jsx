import React, { useContext, useState } from 'react';
import { UserContext } from './useContext';
import { useNavigate } from 'react-router-dom';

async function getotp() {
  try {
    const res = await fetch("http://localhost:5000/api/store-otp"); // This endpoint must return { otp: "123456" }
    const data = await res.json();
    console.log("Fetched OTP:", data.otp);
    return data.otp;
  } catch (err) {
    console.error(err.message);
  }
}

function VerificationPage() {
  const { formData, location } = useContext(UserContext); // now including location
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedOtp = await getotp();
    if (otp === storedOtp) {
      alert("OTP verified successfully!");

      // Send formData + location to backend
      try {
        const res = await fetch("http://localhost:5000/api/save-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData,
            location
          })
        });

        const result = await res.json();
        if (result.success) {
          alert("Data saved successfully!");
          navigate('/success');
        } else {
          alert("Failed to save data: " + result.message);
        }
      } catch (error) {
        console.error("Error saving data:", error);
        alert("An error occurred while saving data.");
      }

    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-orange-500">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center w-80"
  >
    <h1 className="mb-6 text-gray-800 text-2xl font-semibold">
      Verification Page
    </h1>

    <input
      onChange={handleChange}
      value={otp}
      type="text"
      placeholder="Enter OTP"
      className="mb-4 p-2 text-lg border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />

    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 px-4 rounded-md text-lg font-medium hover:bg-indigo-600 transition duration-200"
    >
      Verify
    </button>
  </form>
</div>

  );
}

export default VerificationPage;
