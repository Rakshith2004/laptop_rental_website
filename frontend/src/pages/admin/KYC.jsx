import { useEffect, useState } from "react";
import API from "../../api/axios";

const KYC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/all");
        setUsers(res.data);
      } catch (err) {
        console.error("KYC fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="card">
      <h2>KYC Requests</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u) => (
          <div key={u._id} style={{ marginBottom: "15px" }}>
            <p>
              <strong>Name:</strong> {u.name}
            </p>
            <p>
              <strong>Email:</strong> {u.email}
            </p>
            <p>
              <strong>KYC Status:</strong>{" "}
              {u.kycVerified ? "Verified" : "Pending"}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default KYC;
