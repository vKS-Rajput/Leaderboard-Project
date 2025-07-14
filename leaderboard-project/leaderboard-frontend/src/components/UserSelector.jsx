import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/users';

const UserSelector = ({ selectedUser, setSelectedUser, refreshUsers }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
    refreshUsers?.(); // optional refresh trigger
  };

  const addUser = async () => {
    if (!name.trim()) return;
    await axios.post(API, { name });
    setName('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Select User:</label>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">-- Choose --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="New user name"
        />
        <button onClick={addUser} className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
