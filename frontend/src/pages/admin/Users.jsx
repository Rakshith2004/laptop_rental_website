import { useEffect, useState } from "react";
import API from "../../api/axios";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    API.get("/users/all", authHeader())
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {user.map((u) => (
        <div key={u._id}>
          <p>User ID: {u._id}</p>
          <p>Name: {u.name}</p>
          <p>Email: {u.email}</p>
          <p>Role: {u.role}</p>
        </div>
      ))}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Users;
