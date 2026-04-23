import { useEffect, useState } from "react";
import API from "../../api/axios";

const Users = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API
      .get("/api/users/profile", authHeader())
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Users;