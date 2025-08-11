// client/src/verificationPage.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from './useContext';
import { useNavigate } from 'react-router-dom';

async function getOtpForKey(key) {
  try {
    const url = `http://localhost:5000/api/get-otp?key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.json().catch(()=>({}));
      throw new Error(body.message || 'Failed to fetch OTP');
    }
    const data = await res.json();
    return data.otp;
  } catch (err) {
    console.error('getOtpForKey error:', err);
    return null;
  }
}

export default function VerificationPage() {
  const { formData, location } = useContext(UserContext);
  const [otpInput, setOtpInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // We'll look up OTP by email (key). If you used phone key, use phone.
    const key = formData.email || formData.phone;
    if (!key) {
      alert('No email/phone available for OTP lookup');
      return;
    }

    const storedOtp = await getOtpForKey(key);
    if (!storedOtp) {
      alert('No OTP found or expired');
      return;
    }

    if (otpInput === storedOtp) {
      // Verified — now send formData + location to backend to save
      try {
        const res = await fetch('http://localhost:5000/api/save-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, location })
        });
        const result = await res.json();
        if (result.success) {
          alert('Data saved successfully');
          navigate('/success');
        } else {
          alert('Failed to save data: ' + (result.message || 'Unknown'));
        }
      } catch (err) {
        console.error('Save data error:', err);
        alert('Error saving data');
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-400 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Verification Page</h1>
        <input
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Verify</button>
      </form>
    </div>
  );
}
