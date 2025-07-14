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
    <div className="mt-10 p-6 bg-gray-900 rounded-3xl shadow-2xl border border-gray-700"> {/* Enhanced container */}
      <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center justify-center"> {/* Larger, bolder title */}
        <span className="mr-3 text-blue-400">🏆</span> Leaderboard
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-xl text-gray-400">Loading top contenders...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-400 text-center text-lg py-8">
          No users on the leaderboard yet. Be the first to claim points!
        </p>
      ) : (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700"> {/* Inner container for table */}
          <table className="w-full text-left table-auto"> {/* table-auto for better column sizing */}
            <thead className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 uppercase text-sm"> {/* Gradient header */}
              <tr>
                <th className="py-3 px-5 border-b border-gray-600 rounded-tl-xl">Rank</th>
                <th className="py-3 px-5 border-b border-gray-600">Name</th>
                <th className="py-3 px-5 border-b border-gray-600 rounded-tr-xl text-right">Points</th> {/* Align points right */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`
                    ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} {/* Zebra striping */}
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-gray-900 font-extrabold text-lg shadow-inner' : 'text-gray-200'} {/* Gold styling for 1st place */}
                    hover:bg-opacity-80 transition duration-200 ease-in-out transform hover:scale-[1.01]
                    ${index === 0 ? 'border-b-2 border-yellow-600' : 'border-b border-gray-600'} {/* Bottom border for rows, stronger for 1st */}
                  `}
                >
                  <td className={`py-3 px-5 ${index === 0 ? 'text-2xl' : 'text-base'}`}>
                    {index === 0 && <span className="mr-2">👑</span>} {/* Crown for 1st place */}
                    {index + 1}
                  </td>
                  <td className="py-3 px-5 font-medium">{user.name}</td>
                  <td className={`py-3 px-5 text-right ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
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