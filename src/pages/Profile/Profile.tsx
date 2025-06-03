import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Customer } from "../../models/Customer";
import { Order } from "../../models/Order";
import { Receipt } from "../../models/Receipt";
import { Product } from "../../models/Product";
import "./Profile.css";

const Profile: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const users: Customer[] = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");
    const foundCustomer = users.find((u) => u.email === loggedInEmail) || null;
    setCustomer(foundCustomer);

    const allReceipts: Receipt[] = JSON.parse(localStorage.getItem("awe_receipts") || "[]");
    const allOrders: Order[] = JSON.parse(localStorage.getItem("awe_orders") || "[]");
    setOrders(allOrders);

    if (foundCustomer) {
      const userReceipts = allReceipts.filter(
        (r) =>
          r.customerId === foundCustomer.id ||
          r.customerId === foundCustomer.email
      );
      setReceipts(userReceipts);
    }

    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data as Product[]))
      .catch(() => {});

    if (!localStorage.getItem("awe_logged_in")) {
      navigate("/login");
    }
  }, [navigate]);

  const getOrder = (orderId: string) => orders.find((o) => o.id === orderId);
  const getProductName = (id: string) => {
    const p = products.find((prod) => prod.id === id);
    return p ? p.name : id;
  };

  const handleLogout = () => {
    localStorage.removeItem("awe_logged_in");
    window.location.href = "/login";
  };

  if (!customer) {
    return (
      <div className="profile-container">
        <h2>Profile</h2>
        <p>Please log in to view your profile and receipts.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-heading">Profile</h2>
        <div>
          <span className="profile-label">Name:</span>{" "}
          <span className="profile-value">{customer.name}</span>
        </div>
        <div>
          <span className="profile-label">Email:</span>{" "}
          <span className="profile-value">{customer.email}</span>
        </div>
        <div>
          <span className="profile-label">Address:</span>{" "}
          <span className="profile-value">{customer.address}</span>
        </div>
        <div>
          <span className="profile-label">City:</span>{" "}
          <span className="profile-value">{customer.city}</span>
        </div>
        <div>
          <span className="profile-label">Postcode:</span>{" "}
          <span className="profile-value">{customer.postcode}</span>
        </div>
        <div className="edit-button-container">
          <button
            onClick={() => navigate("/profile/details")}
            className="edit-button"
          >
          Edit Details
          </button>
        </div>
      </div>

      <div className="receipts-card">
        <h3>Your Receipts</h3>
        {receipts.length === 0 ? (
          <div className="no-receipts">No receipts found.</div>
        ) : (
          receipts.map((receipt) => {
            return (
              <Link to={`/receipt/${receipt.id}`}>
              <div className="receipt" key={receipt.id}>
                <div>
                  <strong>Receipt ID:</strong> {receipt.id}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(receipt.date).toLocaleString()}
                </div>
                <div>
                  <strong>Total:</strong> ${receipt.total.toFixed(2)}
                </div>
              </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="profile-footer">
        <a href="/" className="back-button">
          Back to Home
        </a>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
