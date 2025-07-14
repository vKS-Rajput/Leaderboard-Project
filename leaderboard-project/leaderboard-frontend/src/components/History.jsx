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
    // Main container for the history section.
    // Removed `mt-10` as the parent `App` component's grid handles spacing.
    // Adjusted padding for better responsiveness: `p-4` on mobile, `sm:p-6` on small screens.
    <div className="p-4 sm:p-6 bg-gray-800 rounded-3xl shadow-2xl border border-gray-700">
      {/* Title for the claim history */}
      {/* Responsive font sizes: `text-2xl` on mobile, `sm:text-3xl`, `md:text-4xl` on larger screens. */}
      {/* Centered with flex, includes a scroll emoji for visual appeal. */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white flex items-center justify-center">
        <span className="mr-2 sm:mr-3 text-yellow-400">📜</span> Claim History
      </h2>
      <div className="space-y-3 sm:space-y-4"> {/* Adjusted spacing between history entries for mobile */}
        {loading ? ( // Display loading spinner or message
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-500"></div>
            <p className="ml-0 mt-3 text-base sm:text-lg text-gray-400">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          // Message displayed when there are no claims yet
          <p className="text-gray-400 text-center text-base sm:text-lg py-6 sm:py-8">
            ✨ No claims recorded yet. Be the first! ✨
          </p>
        ) : (
          // Map through history entries and display them
          history.map((entry, index) => (
            <div
              key={entry._id}
              className={`
                bg-gray-700 p-3 sm:p-4 rounded-xl border border-gray-600
                hover:bg-gray-600 transition duration-300 ease-in-out
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-md hover:shadow-lg
                ${index % 2 === 0 ? 'border-l-4 border-green-500' : 'border-r-4 border-emerald-500'} {/* Alternating border color */}
              `}
            >
              <p className="text-base sm:text-lg font-medium text-gray-200 leading-relaxed">
                <span className="font-bold text-green-400">@{entry.user?.name}</span> claimed{' '}
                <span className="text-yellow-300 font-extrabold text-lg sm:text-xl">
                  {entry.pointsAwarded}
                </span> points
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 tracking-wide">
                <span className="mr-1">🗓️</span> {new Date(entry.createdAt).toLocaleDateString()}{' '}
                <span className="ml-2 mr-1">⏰</span> {new Date(entry.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Separator line */}
      <hr className="border-gray-700 my-6 sm:my-8" />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 sm:mt-8"> {/* Adjusted top margin for pagination */}
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="
            px-3 py-1 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base
            rounded-full shadow-lg transition duration-300 ease-in-out
            disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105
          "
        >
          <span className="mr-1 sm:mr-2">⬅️</span> Previous
        </button>
        <span className="text-base sm:text-lg font-medium text-gray-300">
          Page <span className="text-yellow-400 text-lg sm:text-xl font-bold">{page}</span>
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading} // Disable "Next" while loading
          className="
            px-3 py-1 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base
            rounded-full shadow-lg transition duration-300 ease-in-out
            disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105
          "
        >
          Next <span className="ml-1 sm:ml-2">➡️</span>
        </button>
      </div>
    </div>
  );
};

export default History;
