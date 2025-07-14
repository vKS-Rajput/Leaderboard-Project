import React, { useEffect, useState } from "react";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import History from "./components/History";
import socket from "./Socket";

/**
 * Mobile‑first & centered version of the Galactic Leaderboard app.
 * All layouts, paddings and font sizes are tuned so the UI fits neatly on small screens (≤ 640 px).
 * Larger viewports will see the same single‑column layout centred in the middle of the screen.
 */
export default function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);

  // Flip‑flop boolean to force refresh of child components
  const triggerRefresh = () => setRefreshToggle((p) => !p);

  useEffect(() => {
    socket.on("user-added", () => triggerRefresh());
    socket.on("points-claimed", () => triggerRefresh());
    return () => {
      socket.off("user-added");
      socket.off("points-claimed");
    };
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-inter"
    >
      {/* Card */}
      <section
        className="w-full max-w-sm bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow animate-fade-in">
          🏆 Galactic Leaderboard 🚀
        </h1>

        {/* Selector */}
        <UserSelector
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          refreshUsers={triggerRefresh}
        />

        {/* Claim */}
        <ClaimButton selectedUser={selectedUser} onClaim={triggerRefresh} />

        {/* Data panels */}
        <div className="flex flex-col gap-6 mt-8">
          <Leaderboard refreshFlag={refreshToggle} />
          <History refreshFlag={refreshToggle} />
        </div>
      </section>
    </main>
  );
}

