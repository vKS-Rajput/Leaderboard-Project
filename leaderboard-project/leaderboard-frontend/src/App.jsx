import React, { useEffect, useState } from "react";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import History from "./components/History";
import socket from "./Socket";

export default function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);

  // Flip-flop boolean to force refresh of child components
  const triggerRefresh = () => setRefreshToggle((p) => !p);

  useEffect(() => {
    // Listen for real-time events from the socket
    // When a user is added, trigger a refresh for all relevant components
    socket.on("user-added", () => {
      console.log("🔄 User added, triggering refresh...");
      triggerRefresh();
    });

    // When points are claimed, trigger a refresh for all relevant components
    socket.on("points-claimed", () => {
      console.log("🔄 Points claimed, triggering refresh...");
      triggerRefresh();
    });

    // Clean up socket listeners when the component unmounts
    return () => {
      socket.off("user-added");
      socket.off("points-claimed");
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

 return (
  <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-inter">
    <section className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-700 transform transition-all duration-300 ease-in-out hover:shadow-3xl">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg animate-fade-in">
        🏆 Galactic Leaderboard 🚀
      </h1>

      {/* User Selector */}
      <UserSelector
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        refreshUsers={triggerRefresh}
      />

      {/* Claim Button */}
      <ClaimButton selectedUser={selectedUser} onClaim={triggerRefresh} />

      {/* Centered Grid */}
      <div className="flex justify-center mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Leaderboard refreshFlag={refreshToggle} />
          <History refreshFlag={refreshToggle} />
        </div>
      </div>
    </section>
  </main>
);

}
