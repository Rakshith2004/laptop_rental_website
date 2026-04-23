import { useEffect, useState } from "react";
import API from "../../api/axios";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    API
      .get("/rentals", authHeader())
      .then((res) => setRentals(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Rentals</h2>
      {rentals.map((r) => (
        <div key={r._id}>
          <p>User: {r.userId}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Rentals;