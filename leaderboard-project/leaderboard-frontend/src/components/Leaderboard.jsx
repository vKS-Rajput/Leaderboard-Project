import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({ refreshFlag }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchLeaderboard = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      // Sort users by totalPoints in descending order
      const sortedUsers = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sortedUsers);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      // Optionally, display an error message to the user
    } finally {
      setLoading(false); // Set loading to false after fetching (success or failure)
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshFlag]);

  return (
    // Main container for the leaderboard.
    // Removed `mt-10` as the parent `App` component's grid handles spacing.
    // Adjusted padding for better responsiveness: `p-4` on mobile, `sm:p-6` on small screens.
    <div className="p-4 sm:p-6 bg-gray-900 rounded-3xl shadow-2xl border border-gray-700">
      {/* Title for the leaderboard */}
      {/* Responsive font sizes: `text-2xl` on mobile, `sm:text-3xl`, `md:text-4xl` on larger screens. */}
      {/* Centered with flex, includes a trophy emoji for visual appeal. */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white flex items-center justify-center">
        <span className="mr-2 sm:mr-3 text-blue-400">🏆</span> Leaderboard
      </h2>

      {/* Conditional rendering for loading state, empty state, or actual leaderboard */}
      {loading ? (
        // Loading spinner and message when data is being fetched
        <div className="flex flex-col justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-500"></div>
          <p className="ml-0 mt-4 text-lg sm:text-xl text-gray-400">Loading top contenders...</p>
        </div>
      ) : users.length === 0 ? (
        // Message displayed when there are no users on the leaderboard
        <p className="text-gray-400 text-center text-base sm:text-lg py-8">
          No users on the leaderboard yet. Be the first to claim points!
        </p>
      ) : (
        // Container for the table, with horizontal scrolling for small screens if content overflows
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-x-auto">
          <table className="w-full text-left table-auto min-w-[300px]"> {/* `min-w` to prevent squishing */}
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 uppercase text-xs sm:text-sm">
              <tr>
                <th className="py-2 px-3 sm:py-3 sm:px-5 border-b border-gray-600 rounded-tl-xl">Rank</th>
                <th className="py-2 px-3 sm:py-3 sm:px-5 border-b border-gray-600">Name</th>
                <th className="py-2 px-3 sm:py-3 sm:px-5 border-b border-gray-600 rounded-tr-xl text-right">Points</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`
                    ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} {/* Zebra striping */}
                    ${index === 0
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-gray-900 font-extrabold text-base sm:text-lg shadow-inner'
                      : 'text-gray-200'} {/* Gold styling for 1st place */}
                    hover:bg-opacity-80 transition duration-200 ease-in-out transform hover:scale-[1.01]
                    ${index === 0 ? 'border-b-2 border-yellow-600' : 'border-b border-gray-600'} {/* Bottom border for rows, stronger for 1st */}
                  `}
                >
                  <td className={`py-2 px-3 sm:py-3 sm:px-5 ${index === 0 ? 'text-lg sm:text-2xl' : 'text-sm sm:text-base'}`}>
                    {index === 0 && <span className="mr-1 sm:mr-2">👑</span>} {/* Crown for 1st place */}
                    {index + 1}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-5 text-sm sm:text-base font-medium">{user.name}</td>
                  <td className={`py-2 px-3 sm:py-3 sm:px-5 text-right ${index === 0 ? 'text-xl sm:text-3xl' : 'text-base sm:text-xl'}`}>
                    {user.totalPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
