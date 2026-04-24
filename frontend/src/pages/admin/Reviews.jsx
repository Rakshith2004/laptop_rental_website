import { useEffect, useState } from "react";
import API from "../../api/axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("reviews/all", authHeader()).then((res) => {
      setReviews(res.data);
    });
  }, []);

  const deleteReview = async (id) => {
    await API.delete(`/reviews/${id}`, authHeader());
    setReviews(reviews.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((r) => (
        <div key={r._id}>
          <p>Brand: {r.laptopId.brand}</p>
          <p>Model: {r.laptopId.model}</p>
          <p>User: {r.userId.name}</p>
          <p>Rating: {r.rating}</p>
          <p>Comment: {r.comment}</p>
          <button onClick={() => deleteReview(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Reviews;
