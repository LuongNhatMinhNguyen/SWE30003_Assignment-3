import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Order } from "../../models/Order";
import { Receipt } from "../../models/Receipt";
import { Product } from "../../models/Product";
import { Customer } from "../../models/Customer";
import "./Receipt.css";

const ReceiptPage = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const receipts: Receipt[] = JSON.parse(localStorage.getItem("awe_receipts") || "[]");
    const orders: Order[] = JSON.parse(localStorage.getItem("awe_orders") || "[]");
    const users: Customer[] = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");

    const foundReceipt = receipts.find(r => r.id === id);
    if (foundReceipt) {
      setReceipt(foundReceipt);
      const foundOrder = orders.find(o => o.id === foundReceipt.orderId);
      setOrder(foundOrder || null);
    }

    const foundCustomer = users.find((u: Customer) => u.email === loggedInEmail);
    setCustomer(foundCustomer || null);

    fetch("/products.json")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {});
  }, [id]);

  const getProductName = (productId: string): string => {
    const p = products.find(prod => prod.id === productId);
    return p ? p.name : productId;
  };

  if (!receipt || !order) {
    return <div className="receipt-container">Receipt not found.</div>;
  }

  return (
    <div className="receipt-container">
      <h2>Receipt</h2>
      <div><strong>Receipt ID:</strong> {receipt.id}</div>
      <div><strong>Order ID:</strong> {order.id}</div>
      <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
      <div><strong>Total:</strong> ${receipt.total.toFixed(2)}</div>
      <div><strong>Customer:</strong> {customer?.name || customer?.email || receipt.customerId}</div>
      <div><strong>Address:</strong> {customer?.address || "-"}</div>
      <div style={{ marginTop: 10 }}>
        <strong>Items:</strong>
        <ul>
          {order.items.map((item, idx) => (
            <li key={idx}>
              {getProductName(item.productId)} (ID: {item.productId}), Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="confirmation-message">
        <h3>Thank you for your purchase!</h3>
        <p>Your order has been placed.<br /><strong>Payment is simulated for this assignment.</strong></p>
      </div>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default ReceiptPage;
