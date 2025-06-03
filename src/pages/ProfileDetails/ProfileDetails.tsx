import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Customer } from "../../models/Customer";
import "./ProfileDetails.css";

const ProfileDetails: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    const users: Customer[] = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");

    const currentUser = users.find(u => u.email === loggedInEmail);
    if (currentUser) {
      setFormData(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users: Customer[] = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const updatedUsers = users.map(user =>
      user.email === formData.email ? formData : user
    );
    localStorage.setItem("awe_users", JSON.stringify(updatedUsers));
    navigate("/profile");
  };

  return (
    <div className="profile-details-container">
        <h2>Edit Your Details</h2>
        <form className="profile-details-form" onSubmit={handleSubmit}>
            <label className="profile-details-label" htmlFor="name">Name</label>
            <input className="profile-details-input" id="name" name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

            <label className="profile-details-label" htmlFor="password">Password</label>
            <input className="profile-details-input" id="password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

            <label className="profile-details-label" htmlFor="address">Address</label>
            <input className="profile-details-input" id="address" name="address" type="text" placeholder="Enter your address (optional)" value={formData.address} onChange={handleChange} />

            <label className="profile-details-label" htmlFor="city">City</label>
            <input className="profile-details-input" id="city" name="city" type="text" placeholder="Enter your city (optional)" value={formData.city} onChange={handleChange} />

            <label className="profile-details-label" htmlFor="postcode">Postcode</label>
            <input className="profile-details-input" id="postcode" name="postcode" type="text" placeholder="Enter your postcode (optional)" value={formData.postcode} onChange={handleChange} />
            <button type="submit" className="profile-details-button">Save Changes</button>
        </form>
        <Link to="/profile" className="back-button">Cancel</Link>
    </div>
  );
};

export default ProfileDetails;
