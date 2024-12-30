'use client';

import { useState } from 'react';

export default function SeriesPage() {
  const [step, setStep] = useState(1);
  const [episodeCount, setEpisodeCount] = useState(0);
  const [episodeUrls, setEpisodeUrls] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEpisodeCountSubmit = (e) => {
    e.preventDefault();
    if (isNaN(episodeCount) || episodeCount <= 0) {
      setErrorMessage('Please enter a valid number of episodes.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleEpisodeUrlSubmit = (e) => {
    e.preventDefault();
    if (!currentEpisode) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }
    setEpisodeUrls((prev) => [...prev, currentEpisode]);
    setCurrentEpisode('');

    if (episodeUrls.length + 1 >= episodeCount) {
      // All URLs entered, proceed to submit
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    // Call the API route to process the series data
    const response = await fetch('/api/process-series', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ episodeUrls }),
    });
    const result = await response.json();
    alert(result.message);
    setStep(1); // Reset form
    setEpisodeUrls([]);
    setEpisodeCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Add a Series</h1>

      {step === 1 && (
        <form onSubmit={handleEpisodeCountSubmit} className="space-y-4">
          <label className="block">
            Enter Number of Episodes:
            <input
              type="number"
              value={episodeCount}
              onChange={(e) => setEpisodeCount(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleEpisodeUrlSubmit} className="space-y-4">
          <label className="block">
            Enter URL for Episode {episodeUrls.length + 1}:
            <input
              type="url"
              value={currentEpisode}
              onChange={(e) => setCurrentEpisode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            {episodeUrls.length + 1 === episodeCount ? 'Finish' : 'Next'}
          </button>
        </form>
      )}

      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}
