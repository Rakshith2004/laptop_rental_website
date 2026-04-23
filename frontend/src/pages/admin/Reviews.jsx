import { useEffect, useState } from "react";
import API from "../../api/axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("/api/reviews/my-reviews", authHeader()).then((res) => {
      setReviews(res.data);
    });
  }, []);

  const deleteReview = async (id) => {
    await API.delete(`/api/reviews/${id}`, authHeader());
    setReviews(reviews.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((r) => (
        <div key={r._id}>
          <p>{r.comment}</p>
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