import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Cpu,
  HardDrive,
  Monitor,
  MemoryStick,
  Laptop,
  BadgeCheck,
} from "lucide-react";
import "./LaptopDetails.css";

const LaptopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/laptops/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setLaptop(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!laptop) return <div className="loading">No laptop found</div>;
  const handleRentNow = () => {
    navigate("/checkout", { state: { laptop } });
  };
  return (
    <div className="details-page">
      <div className="details-wrapper">
        {/* IMAGE */}
        <div className="image-section">
          <img
            src={`http://localhost:8000/${laptop.images?.[0] || ""}`}
            alt={laptop.model}
          />
        </div>

        {/* INFO */}
        <div className="info-section">
          {/* TITLE */}
          <div>
            <h1>
              {laptop.brand} {laptop.model}
            </h1>
            <p className="category">{laptop.category}</p>
          </div>

          {/* AVAILABILITY */}
          <div className="availability">
            <BadgeCheck size={14} />
            {laptop.availableUnits > 0
              ? `${laptop.availableUnits} units available`
              : "Out of stock"}
          </div>

          {/* SPECS */}
          <div className="specs-grid">
            <div>
              <MemoryStick size={14} /> {laptop.specs?.ram || "N/A"}
            </div>
            <div>
              <Cpu size={14} /> {laptop.specs?.processor || "N/A"}
            </div>
            <div>
              <HardDrive size={14} /> {laptop.specs?.storage || "N/A"}
            </div>
            <div>
              <Monitor size={14} /> {laptop.specs?.display || "N/A"}
            </div>
            <div>
              <Laptop size={14} /> {laptop.specs?.gpu || "N/A"}
            </div>
            <div>
              <Laptop size={14} /> {laptop.specs?.os || "N/A"}
            </div>
          </div>

          {/* PRICE */}
          <div className="pricing-box">
            <h3>Pricing</h3>
            <p className="price-main">
              ₹{laptop.pricing?.perDay || "0"} <span>/ day</span>
            </p>
            <div className="price-sub">
              <p>₹{laptop.pricing?.perWeek || "0"} / week</p>
              <p>₹{laptop.pricing?.perMonth || "0"} / month</p>
            </div>
          </div>

          {/* EXTRA */}
          <div className="extra-info">
            <p>
              Condition: <span>{laptop.condition || "N/A"}</span>
            </p>
            <p>
              Deposit: <span>₹{laptop.securityDeposit || "0"}</span>
            </p>
          </div>

          {/* BUTTON - NOW VISIBLE WITHOUT SCROLLING */}
          <button className="rent-btn" onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetails;
