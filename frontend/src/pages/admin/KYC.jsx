import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserCard from "../../components/kyc/UserCard";
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

  const pendingUsers = users.filter((u) => u.kycStatus === "pending");
  const rejectedUsers = users.filter((u) => u.kycStatus === "rejected");

  return (
    <div className="card">
      <h2>KYC Management</h2>
      <h3>Pending Requests</h3>
      {pendingUsers.length === 0 ? (
        <p>No pending KYC</p>
      ) : (
        pendingUsers.map((u) => <UserCard key={u._id} user={u} />)
      )}

      <h3>Rejected Requests</h3>
      {rejectedUsers.length === 0 ? (
        <p>No rejected KYC</p>
      ) : (
        rejectedUsers.map((u) => <UserCard key={u._id} user={u} />)
      )}
    </div>
  );
};

export default KYC;
