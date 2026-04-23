import { useEffect, useState } from "react";
import API from "../../api/axios";

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await API.get("/laptops");
        setLaptops(res.data);
      } catch (err) {
        console.error("Error fetching laptops:", err);
      }
    };

    fetchLaptops();
  }, []);

  const deleteLaptop = async (id) => {
    try {
      await API.delete(`/laptops/${id}`);
      setLaptops((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="row">
      {laptops.map((lap) => (
        <div className="card clickable" key={lap._id}>
          <img
            src={
              lap.images?.[0] ? `${BASE_URL}/${lap.images[0]}` : "/no-image.png"
            }
            alt={lap.model}
            className="card-img"
          />

          <div className="card-body">
            <h3>{lap.model}</h3>
            <p className="muted">{lap.brand}</p>

            <div className="tags">
              <span>{lap.specs?.processor}</span>
              <span>{lap.specs?.ram}</span>
              <span>{lap.specs?.storage}</span>
            </div>

            <div className="card-bottom">
              <span className="price">₹{lap.pricing?.perDay}</span>

              <button onClick={() => deleteLaptop(lap._id)}>Delete</button>
            </div>

            <p>Status: {lap.status}</p>
            <p>Available: {lap.availableUnits}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Laptops;
