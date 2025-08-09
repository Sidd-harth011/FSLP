import React, { useContext } from 'react';
import { UserContext } from './useContext';

function VerificationPage() {
  const { formData, location } = useContext(UserContext);

  return (
    <div>
      <h1>Verification Page</h1>
      <h2>Form Data</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
      <p>Address: {formData.address}</p>
      <p>Profession: {formData.profession}</p>
      <p>Age: {formData.age}</p>
      <p>About: {formData.about}</p>
      <p>Gender: {formData.gender}</p>

      <h2>Location</h2>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lon}</p>

      <h2>Verification Status</h2>
      <p>Your information has been successfully verified!</p>
      <p>We will contact you soon.</p>
      <p>Contact us at: 9310208562</p>
    </div>
  );
}

export default VerificationPage;
