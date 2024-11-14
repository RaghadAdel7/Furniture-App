import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero-content">
      <div className="hero-background">
        <h1>Transform Your Home with Raghad's Furniture</h1>
        <p>Luxury & Comfort for Every Corner</p>
        <p className="hero-promotion">
          🎉 Limited Time Offer: Up to 50% Off!🎉
        </p>
        <a href="/products" className="btn-primary">
          Shop Now
        </a>
      </div>
    </div>
  );
}
