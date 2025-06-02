import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "300px",
  padding: "10px",
  border: "1px solid gray",
  borderRadius: "4px",
  margin: "10px 0",
  fontSize: "1rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#222",
};

const Checkout = () => {
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);

  // Get latest receipt, order, customer, and products from localStorage
  useEffect(() => {
    const receipts = JSON.parse(localStorage.getItem("awe_receipts") || "[]");
    const orders = JSON.parse(localStorage.getItem("awe_orders") || "[]");
    const users = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");
    const foundCustomer = users.find((u) => u.email === loggedInEmail);
    setCustomer(foundCustomer);

    if (receipts.length > 0) setLatestReceipt(receipts[receipts.length - 1]);
    if (orders.length > 0) setLatestOrder(orders[orders.length - 1]);

    // Pre-fill shipping from user account if available
    if (foundCustomer) {
      setShipping({
        address: foundCustomer.address || "",
        city: foundCustomer.city || "",
        postcode: foundCustomer.postcode || "",
        country: foundCustomer.country || "",
      });
    }

    // Fetch products for display in receipt
    fetch("/products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !shipping.address.trim() ||
      !shipping.city.trim() ||
      !shipping.postcode.trim() ||
      !shipping.country.trim()
    ) {
      alert("Please fill in all shipping details.");
      return;
    }
    localStorage.setItem("awe_shipping", JSON.stringify(shipping));
    setSubmitted(true);
  };

  const getProductName = (id) => {
    const p = products.find((prod) => prod.id === id);
    return p ? p.name : id;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      {customer && (
        <div style={{ marginBottom: 8, color: "#1976d2", fontWeight: 500 }}>
          Logged in as: {customer.name ? customer.name : customer.email}
        </div>
      )}

      <h2 style={{ marginBottom: 24, color: "#1976d2" }}>Checkout</h2>
      {latestReceipt && latestOrder && (
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: 24,
            marginBottom: 32,
            minWidth: 340,
            maxWidth: 400,
            color: "#000", 
          }}
        >
          <h3 style={{ color: "#000", marginBottom: 12 }}>Receipt</h3>
          <div>
            <strong>Receipt ID:</strong> {latestReceipt.id}
          </div>
          <div>
            <strong>Order ID:</strong> {latestReceipt.orderId}
          </div>
          <div>
            <strong>Date:</strong> {new Date(latestReceipt.date).toLocaleString()}
          </div>
          <div>
            <strong>Total:</strong> ${latestReceipt.total.toFixed(2)}
          </div>
          <div>
            <strong>Customer:</strong>{" "}
            {customer
              ? customer.name
                ? customer.name
                : customer.email
              : latestReceipt.customerId}
          </div>
          <div>
            <strong>Address:</strong> {customer ? customer.address : ""}
          </div>
          <div style={{ marginTop: 10 }}>
            <strong>Items:</strong>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {latestOrder.items.map((item, idx) => (
                <li key={idx}>
                  {getProductName(item.productId)} (ID: {item.productId}), Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: 24,
            minWidth: 340,
            maxWidth: 400,
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#222", marginBottom: 12 }}>Shipping Details</h3>
          <label style={labelStyle} htmlFor="address">
            Address
          </label>
          <input
            style={inputStyle}
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            value={shipping.address}
            onChange={handleChange}
          />
          <label style={labelStyle} htmlFor="city">
            City
          </label>
          <input
            style={inputStyle}
            id="city"
            name="city"
            type="text"
            placeholder="Enter your city"
            value={shipping.city}
            onChange={handleChange}
          />
          <label style={labelStyle} htmlFor="postcode">
            Postcode
          </label>
          <input
            style={inputStyle}
            id="postcode"
            name="postcode"
            type="text"
            placeholder="Enter your postcode"
            value={shipping.postcode}
            onChange={handleChange}
          />
          <label style={labelStyle} htmlFor="country">
            Country
          </label>
          <input
            style={inputStyle}
            id="country"
            name="country"
            type="text"
            placeholder="Enter your country"
            value={shipping.country}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              marginTop: "18px",
              background: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#0056b3")}
            onMouseOut={(e) => (e.target.style.background = "#007bff")}
          >
            Confirm Shipping
          </button>
        </form>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: 24,
            minWidth: 340,
            maxWidth: 400,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#28a745" }}>Thank you for your purchase!</h3>
          <p>
            Your order has been placed and shipping details saved.<br />
            <strong>Payment is simulated for this assignment.</strong>
          </p>
        </div>
      )}

      <Link
        to="/"
        style={{
          marginTop: 16,
          background: "#666",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: 500,
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#444")}
        onMouseOut={(e) => (e.target.style.background = "#666")}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Checkout;