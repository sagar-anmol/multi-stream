'use client';

import { useState } from 'react';

export default function MoviesPage() {
  const [movieUrl, setMovieUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieUrl || !movieUrl.startsWith('http')) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }

    try {
      // Call the API to process the movie URL
      const response = await fetch('/api/process-movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieUrl }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setMovieUrl(''); // Clear the input field
      } else {
        setErrorMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Failed to process the movie.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Add a Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Enter Movie URL:
          <input
            type="url"
            value={movieUrl}
            onChange={(e) => setMovieUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
}
