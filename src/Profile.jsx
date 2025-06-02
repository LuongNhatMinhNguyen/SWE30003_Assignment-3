import React, { useEffect, useState } from "react";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");
    const foundCustomer = users.find((u) => u.email === loggedInEmail);
    setCustomer(foundCustomer);

    const allReceipts = JSON.parse(localStorage.getItem("awe_receipts") || "[]");
    const allOrders = JSON.parse(localStorage.getItem("awe_orders") || "[]");
    setOrders(allOrders);

    // Filter receipts for this user
    if (foundCustomer) {
      const userReceipts = allReceipts.filter(
        (r) =>
          r.customerId === foundCustomer.id ||
          r.customerId === foundCustomer.email
      );
      setReceipts(userReceipts);
    }

    // Fetch products for display in receipts
    fetch("/products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const getOrder = (orderId) => orders.find((o) => o.id === orderId);
  const getProductName = (id) => {
    const p = products.find((prod) => prod.id === id);
    return p ? p.name : id;
  };

  if (!customer) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Profile</h2>
        <p>Please log in to view your profile and receipts.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 24 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: 24,
          maxWidth: 600,
          margin: "0 auto 32px auto",
        }}
      >
        <h2 style={{ color: "#1976d2" }}>Profile</h2>
        <div>
          <strong style={{ color: "#000" }}>Name:</strong> <span style={{ color: "#000" }}>{customer.name}</span>
        </div>
        <div>
          <strong style={{ color: "#000" }}>Email:</strong> <span style={{ color: "#000" }}>{customer.email}</span>
        </div>
        <div>
          <strong style={{ color: "#000" }}>Address:</strong> <span style={{ color: "#000" }}>{customer.address}</span>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: 24,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <h3 style={{ color: "#222" }}>Your Receipts</h3>
        {receipts.length === 0 ? (
          <div style={{ color: "#888" }}>No receipts found.</div>
        ) : (
          receipts.map((receipt) => {
            const order = getOrder(receipt.orderId);
            return (
              <div
                key={receipt.id}
                style={{
                  borderBottom: "1px solid #eee",
                  marginBottom: 18,
                  paddingBottom: 12,
                  color: "#000",
                }}
              >
                <div>
                  <strong>Receipt ID:</strong> {receipt.id}
                </div>
                <div>
                  <strong>Order ID:</strong> {receipt.orderId}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(receipt.date).toLocaleString()}
                </div>
                <div>
                  <strong>Total:</strong> ${receipt.total.toFixed(2)}
                </div>
                {order && (
                  <div style={{ marginTop: 6 }}>
                    <strong>Items:</strong>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {getProductName(item.productId)} (ID: {item.productId}), Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <a
          href="/"
          style={{
            background: "#666",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: 500,
            transition: "background 0.2s",
            display: "inline-block",
          }}
          onMouseOver={e => (e.target.style.background = "#444")}
          onMouseOut={e => (e.target.style.background = "#666")}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Profile;