import { useEffect, useState } from "react";
import API from "../../api/axios";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    API.get("/rentals/admin", authHeader())
      .then((res) => setRentals(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Rentals</h2>
      {rentals.map((r) => (
        <div key={r._id}>
          <p>User Id: {r.userId._id}</p>
          <p>User Name: {r.userId.name}</p>
          <p>Laptop Id: {r.laptopId._id}</p>
          <p>Brand: {r.laptopId.brand}</p>
          <p>Model: {r.laptopId.model}</p>
          <p>Amount: {r.pricing.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Rentals;
