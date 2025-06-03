import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderItem } from "../../models/Order";
import { Receipt } from "../../models/Receipt";
import { Product } from "../../models/Product";
import { Customer } from "../../models/Customer";
import "./Checkout.css";


interface ShippingInfo {
  address: string;
  city: string;
  postcode: string;
}

interface LocationState {
  cart: { productId: string; quantity: number }[];
  total: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total }: LocationState = location.state || { cart: [], total: 0 };

  const [shipping, setShipping] = useState<ShippingInfo>({
    address: "",
    city: "",
    postcode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("awe_users") || "[]");
    const loggedInEmail = localStorage.getItem("awe_logged_in");
    const foundCustomer = users.find((u: Customer) => u.email === loggedInEmail);
    setCustomer(foundCustomer);

    if (foundCustomer) {
      setShipping({
        address: foundCustomer.address || "",
        city: foundCustomer.city || "",
        postcode: foundCustomer.postcode || "",
      });
    }

    fetch("/products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const getProductName = (id: string): string => {
    const p = products.find((prod) => prod.id === id);
    return p ? p.name : id;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!shipping.address || !shipping.city || !shipping.postcode) {
      alert("Please fill in all shipping details.");
      return;
    }

    const customerId = customer?.id || customer?.email || "guest";

    const newOrder = new Order(
      uuidv4().split("-")[0],
      customerId,
      cart.map((item) => new OrderItem(item.productId, item.quantity)),
      total,
      new Date().toISOString()
    );

    const newReceipt = new Receipt(
      uuidv4().split("-")[0],
      newOrder.id,
      newOrder.total,
      newOrder.date,
      newOrder.customerId
    );

    // Save to localStorage
    const orders: Order[] = JSON.parse(localStorage.getItem("awe_orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("awe_orders", JSON.stringify(orders));

    const receipts: Receipt[] = JSON.parse(localStorage.getItem("awe_receipts") || "[]");
    receipts.push(newReceipt);
    localStorage.setItem("awe_receipts", JSON.stringify(receipts));

    localStorage.setItem("awe_cart", "[]");
    localStorage.setItem("awe_shipping", JSON.stringify(shipping));

    setOrder(newOrder);
    setReceipt(newReceipt);
    setSubmitted(true);
    navigate(`/receipt/${newReceipt.id}`);
  };

  return (
    <div className="checkout-container">
      {customer && (
        <div className="checkout-user">
          Logged in as: {customer.name || customer.email}
        </div>
      )}

      <h2 className="checkout-heading">Checkout</h2>

      {!submitted ? (
        <>
          <form className="shipping-form" onSubmit={handleSubmit}>
            <h3>Shipping Details</h3>
            <label className="checkout-label" htmlFor="address">Address</label>
            <input className="checkout-input" id="address" name="address" type="text" value={shipping.address} onChange={handleChange} />
            <label className="checkout-label" htmlFor="city">City</label>
            <input className="checkout-input" id="city" name="city" type="text" value={shipping.city} onChange={handleChange} />
            <label className="checkout-label" htmlFor="postcode">Postcode</label>
            <input className="checkout-input" id="postcode" name="postcode" type="text" value={shipping.postcode} onChange={handleChange} />
            <button className="checkout-button" type="submit">Confirm Shipping</button>
          </form>

          <div className="receipt-container">
            <h3>Invoice Preview</h3>
            <div><strong>Customer:</strong> {customer?.name || customer?.email || 'Guest'}</div>
            <div><strong>Address:</strong> {shipping.address || '-'}</div>
            <div><strong>City:</strong> {shipping.city || '-'}</div>
            <div><strong>Postcode:</strong> {shipping.postcode || '-'}</div>
            <div><strong>Total:</strong> ${total.toFixed(2)}</div>
            <div style={{ marginTop: 10 }}>
              <strong>Items:</strong>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {cart.map((item, idx) => (
                  <li key={idx}>
                    {getProductName(item.productId)} (ID: {item.productId}), Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="receipt-container">
            <h3>Receipt</h3>
            <div><strong>Receipt ID:</strong> {receipt?.id}</div>
            <div><strong>Order ID:</strong> {order?.id}</div>
            <div><strong>Date:</strong> {new Date(order!.date).toLocaleString()}</div>
            <div><strong>Total:</strong> ${receipt!.total.toFixed(2)}</div>
            <div><strong>Customer:</strong> {customer?.name || customer?.email || receipt!.customerId}</div>
            <div><strong>Address:</strong> {shipping.address}</div>
            <div style={{ marginTop: 10 }}>
              <strong>Items:</strong>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {order!.items.map((item, idx) => (
                  <li key={idx}>
                    {getProductName(item.productId)} (ID: {item.productId}), Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="confirmation-message">
            <h3>Thank you for your purchase!</h3>
            <p>Your order has been placed and shipping details saved.<br /><strong>Payment is simulated for this assignment.</strong></p>
          </div>
        </>
      )}

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default Checkout;
