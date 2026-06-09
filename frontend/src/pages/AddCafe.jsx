import { useState } from "react";

function AddCafe() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    mood: "study",
    rating: 5,
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setMessage("You must login first!");
      return;
    }

    const res = await fetch("http://localhost:5000/api/cafes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Cafe added successfully!");
      console.log(data);
    } else {
      setMessage(data.message || "Failed to add cafe");
    }
  };

  return (
    <div>
      <h2>Add Cafe</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Cafe name" onChange={handleChange} />
        <br /><br />

        <input name="city" placeholder="City" onChange={handleChange} />
        <br /><br />

        <input name="address" placeholder="Address" onChange={handleChange} />
        <br /><br />

        <select name="mood" onChange={handleChange}>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="friends">Friends</option>
          <option value="date">Date</option>
          <option value="relax">Relax</option>
          <option value="cheap">Cheap</option>
          <option value="instagram">Instagram</option>
        </select>
        <br /><br />

        <input
          name="rating"
          type="number"
          placeholder="Rating"
          min="1"
          max="5"
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <br /><br />

        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <br /><br />

        <button type="submit">Add Cafe</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default AddCafe;