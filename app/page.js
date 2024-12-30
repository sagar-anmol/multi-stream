'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleNavigation = (type) => {
    if (type === 'series') {
      router.push('/series');
    } else if (type === 'movies') {
      router.push('/movies');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your App</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleNavigation('movies')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Movies
        </button>
        <button
          onClick={() => handleNavigation('series')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Series
        </button>
      </div>
    </div>
  );
}
