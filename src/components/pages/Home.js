import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };

  const deleteUsers = async (id) => {
    axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((users, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{users.name}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>
                  <Link className="btn btn-primary" to={`/users/${users.id}`}>
                    View
                  </Link>{" "}
                  &nbsp;
                  <Link
                    className="btn btn-outline-primary"
                    to={`/users/edit/${users.id}`}
                  >
                    Edit
                  </Link>{" "}
                  &nbsp;
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUsers(users.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
