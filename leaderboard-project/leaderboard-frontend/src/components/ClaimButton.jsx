import React, { useState } from 'react';
import axios from 'axios';

const ClaimButton = ({ selectedUser, onClaim }) => {
  const [awarded, setAwarded] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!selectedUser) return alert("Please select a user first.");
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/claim/${selectedUser}`
      );
      setAwarded(res.data.pointsAwarded);
      onClaim?.(); // trigger leaderboard/history refresh if needed
    } catch (err) {
      console.error("Claim error:", err);
      alert("Error claiming points");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 text-center"> {/* Increased margin */}
      <button
        onClick={handleClaim}
        disabled={!selectedUser || loading} // Disable while loading
        className={`
          mt-6 w-full py-3 px-6
          bg-gradient-to-r from-green-500 to-emerald-600 {/* Gradient background */}
          hover:from-green-600 hover:to-emerald-700 {/* Darker hover gradient */}
          text-white font-extrabold {/* Bolder text */}
          rounded-xl {/* More rounded corners */}
          shadow-lg hover:shadow-xl {/* Stronger shadow and hover effect */}
          transform transition-all duration-300 ease-in-out {/* Smoother transitions */}
          ${!selectedUser || loading // Disabled state styles
            ? 'opacity-60 cursor-not-allowed transform-none'
            : 'hover:scale-105 active:scale-95' // Active press effect
          }
          ${loading ? 'animate-pulse' : ''} {/* Pulse animation when loading */}
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Claiming...
          </span>
        ) : (
          <>
            <span className="text-xl mr-2">🚀</span> Claim Points
          </>
        )}
      </button>

      {awarded !== null && (
        <p className="mt-4 text-xl font-semibold text-green-400 animate-bounce-in"> {/* Bolder, larger, and animated text */}
          🎉 You received <strong className="text-green-300 text-3xl drop-shadow-md">{awarded}</strong> points!
        </p>
      )}
    </div>
  );
};

export default ClaimButton;