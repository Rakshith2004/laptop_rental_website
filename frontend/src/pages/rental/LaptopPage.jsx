import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./LaptopPage.css";
import { useNavigate } from "react-router-dom";

const LaptopPage = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    brand: "",
    gpu: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/";

  const fetchLaptops = async () => {
    try {
      setLoading(true);

      const params = {
        ...filters,
      };

      const res = await API.get("/laptops", { params });

      let data = res.data;

      if (search) {
        data = data.filter((lap) =>
          `${lap.brand} ${lap.model}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
      }

      setLaptops(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="laptops-page">
      <h1>All Laptops</h1>

      <input
        type="text"
        placeholder="Search laptops..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <input name="brand" placeholder="Brand" onChange={handleChange} />

        <input name="gpu" placeholder="GPU" onChange={handleChange} />

        <select name="condition" onChange={handleChange}>
          <option value="">Condition</option>
          <option value="new">New</option>
          <option value="good">Good</option>
          <option value="used">Used</option>
        </select>

        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          onChange={handleChange}
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          onChange={handleChange}
        />
      </div>

      <div className="laptop-grid">
        {loading ? (
          <p>Loading...</p>
        ) : laptops.length > 0 ? (
          laptops.map((lap) => (
            <div
              key={lap._id}
              className="laptop-card"
              onClick={() => navigate(`/laptops/details/${lap._id}`)}
            >
              <img src={`${baseURL}${lap.images?.[0]}`} alt={lap.model} />

              <h3>
                {lap.brand} {lap.model}
              </h3>
              <p>{lap.specs?.processor}</p>
              <p className="price">₹{lap.pricing?.perDay}/day</p>
            </div>
          ))
        ) : (
          <p>No laptops found</p>
        )}
      </div>
    </div>
  );
};

export default LaptopPage;
