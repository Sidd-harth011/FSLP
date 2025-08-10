import React from 'react';

const ErrorPage = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-fit mx-auto mt-4">
      <span className="block sm:inline font-medium">Entered phone/email is wrong.</span>
    </div>
  );
}

export default ErrorPage;
