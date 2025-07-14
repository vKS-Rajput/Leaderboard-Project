import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = ({ refreshFlag }) => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchHistory = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await axios.get(`http://localhost:5000/api/users/history?page=${page}&limit=5`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      // Optionally, display an error message to the user
    } finally {
      setLoading(false); // Set loading to false after fetching (success or failure)
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, refreshFlag]);

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700"> {/* Enhanced container */}
      <h2 className="text-3xl font-extrabold mb-6 text-white flex items-center justify-center"> {/* Larger, bolder title */}
        <span className="mr-3 text-yellow-400">📜</span> Claim History
      </h2>
      <div className="space-y-4"> {/* Increased spacing */}
        {loading ? ( // Display loading spinner or message
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="ml-4 text-lg text-gray-400">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <p className="text-gray-400 text-center text-lg py-8">
            ✨ No claims recorded yet. Be the first! ✨
          </p>
        ) : (
          history.map((entry, index) => (
            <div
              key={entry._id}
              className={`
                bg-gray-700 p-4 rounded-xl border border-gray-600
                hover:bg-gray-600 transition duration-300 ease-in-out
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-md hover:shadow-lg
                ${index % 2 === 0 ? 'border-l-4 border-green-500' : 'border-r-4 border-emerald-500'} {/* Alternating border color */}
              `}
            >
              <p className="text-lg font-medium text-gray-200 leading-relaxed">
                <span className="font-bold text-green-400">@{entry.user?.name}</span> claimed{' '}
                <span className="text-yellow-300 font-extrabold text-xl">
                  {entry.pointsAwarded}
                </span> points
              </p>
              <p className="text-xs text-gray-400 mt-2 tracking-wide">
                <span className="mr-1">🗓️</span> {new Date(entry.createdAt).toLocaleDateString()}{' '}
                <span className="ml-2 mr-1">⏰</span> {new Date(entry.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      ---

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8"> {/* Align items in center */}
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="
            px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800 text-white font-semibold
            rounded-full shadow-lg transition duration-300 ease-in-out
            disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105
          "
        >
          <span className="mr-2">⬅️</span> Previous
        </button>
        <span className="text-lg font-medium text-gray-300">
          Page <span className="text-yellow-400 text-xl font-bold">{page}</span>
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading} // Disable "Next" while loading
          className="
            px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800 text-white font-semibold
            rounded-full shadow-lg transition duration-300 ease-in-out
            disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105
          "
        >
          Next <span className="ml-2">➡️</span>
        </button>
      </div>
    </div>
  );
};

export default History;