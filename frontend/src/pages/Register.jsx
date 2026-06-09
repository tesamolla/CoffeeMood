import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("User registered successfully!");
    } else {
      setMessage(data.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <br /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br /><br />
        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;