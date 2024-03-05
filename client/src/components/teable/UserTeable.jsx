import React from 'react';

const UserTable = () => {
  // Generate 50 dummy user data
  const users = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    user: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    action: 'Some Action',
  }));

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
