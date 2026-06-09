import { useEffect, useState } from "react";

function Home() {
  const [cafes, setCafes] = useState([]);
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    rating: "",
    description: "",
    imageUrl: "",
  });

  const fetchCafes = async () => {
    const url = mood
      ? `http://localhost:5000/api/cafes/mood/${mood}`
      : "http://localhost:5000/api/cafes";

    const res = await fetch(url);
    const data = await res.json();
    setCafes(data);
  };

  useEffect(() => {
    fetchCafes();
  }, [mood]);

  const deleteCafe = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setMessage("You must login first!");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/cafes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Cafe deleted successfully!");
      fetchCafes();
    } else {
      setMessage(data.message || "Delete failed");
    }
  };

  const startEdit = (cafe) => {
    setEditingId(cafe._id);
    setEditData({
      rating: cafe.rating,
      description: cafe.description,
      imageUrl: cafe.imageUrl,
    });
  };

  const updateCafe = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setMessage("You must login first!");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/cafes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Cafe updated successfully!");
      setEditingId(null);
      fetchCafes();
    } else {
      setMessage(data.message || "Update failed");
    }
  };

  return (
    <div>
      <div className="hero">
        <h1>☕ CoffeeMood</h1>
        <p>
          Find the perfect cafe for studying, working, relaxing or meeting
          friends.
        </p>
      </div>

      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">All moods</option>
        <option value="study">Study</option>
        <option value="work">Work</option>
        <option value="friends">Friends</option>
        <option value="date">Date</option>
        <option value="relax">Relax</option>
        <option value="cheap">Cheap</option>
        <option value="instagram">Instagram</option>
      </select>

      <br />
      <br />

      <p>{message}</p>

      {cafes.length === 0 ? (
        <p>No cafes found.</p>
      ) : (
        cafes.map((cafe) => (
          <div key={cafe._id} className="cafe-card">
            {cafe.imageUrl && <img src={cafe.imageUrl} alt={cafe.name} />}

            <h2>{cafe.name}</h2>

            <p>
              <strong>City:</strong> {cafe.city}
            </p>

            <p>
              <strong>Address:</strong> {cafe.address}
            </p>

            <p>
              <strong>Mood:</strong> {cafe.mood}
            </p>

            {editingId === cafe._id ? (
              <>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editData.rating}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      rating: e.target.value,
                    })
                  }
                />

                <br />
                <br />

                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                />

                <br />
                <br />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={editData.imageUrl}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      imageUrl: e.target.value,
                    })
                  }
                />

                <br />
                <br />

                <button onClick={() => updateCafe(cafe._id)}>Save</button>{" "}
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Rating:</strong> ⭐ {cafe.rating}/5
                </p>

                <p>{cafe.description}</p>

                <button onClick={() => startEdit(cafe)}>Edit Cafe</button>{" "}
                <button onClick={() => deleteCafe(cafe._id)}>
                  Delete Cafe
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;