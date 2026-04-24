import { useEffect, useState } from "react";
import API from "../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    laptops: 0,
    rentals: 0,
    payments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [laptopsRes, rentalsRes, paymentsRes] = await Promise.all([
          API.get("/laptops"),
          API.get("/rentals/admin"),
          API.get("/payments/all"),
        ]);

        console.log("Laptops:", laptopsRes.data);
        console.log("Rentals:", rentalsRes.data);
        console.log("Payments:", paymentsRes.data);

        setStats({
          laptops: laptopsRes.data?.length || 0,
          rentals: rentalsRes.data?.length || 0,
          payments: paymentsRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Total Laptops: {stats.laptops}</p>
      <p>Total Rentals: {stats.rentals}</p>
      <p>Total Payments: {stats.payments}</p>
    </div>
  );
};

export default Dashboard;
