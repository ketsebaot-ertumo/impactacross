// app/error.jsx
'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // console.error('❌ Error caught in Global Error Boundary:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 text-lg">{error?.message || 'Unexpected error occurred.'}</p>
      
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-800 transition"
      >
        Try Again
      </button>
    </main>
  );
}
