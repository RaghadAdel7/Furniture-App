import React from "react";
import "./Hero.css";

export default function Hero({ categories }) {
  return (
    <div className="hero-content">
      <h1>Welcome to Raghad's App </h1>
      <p>Your one-stop store for the best products.</p>
      <a href="/products" className="btn-primary">
        Shop Now
      </a>
    </div>
  );
}
