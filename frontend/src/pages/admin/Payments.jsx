import { useEffect, useState } from "react";
import API from "../../api/axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API
      .get("/payments/all", authHeader())
      .then((res) => setPayments(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      {payments.map((p) => (
        <div key={p._id}>
          <p>Amount: ₹{p.amount}</p>
          <p>Status: {p.status}</p>
          <p>Date : {p.paidAt}</p>
          <p>User ID : {p.userId._id}</p>
          <p>Name: {p.userId.name}</p>
          <p>Email: {p.userId.email}</p>
          <p>Rental ID: {p.rentalId._id}</p>
        </div>
      ))}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Payments;