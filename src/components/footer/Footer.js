import React from "react";
import { Link } from "react-router-dom"; 
import "./Footer.css";
import instagram from "./instagram.png";
import twitter from "./twitter.png";
import mail from "./mail.png";

export default function Footer() {
  return (
    <footer>
      <section className="footer">
        <p>&copy; 2024 Raghad's App. All Rights Reserved.</p>
        <Link to="/privacy-policy">Privacy Policy</Link> |
        <Link to="/terms-of-service">Terms of Service</Link> |
        <Link to="/contact-us">Contact Us</Link>
        <br />
        <br />
        <a
          href="https://www.instagram.com/random/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="Instagram" />
        </a>
        <a
          href="https://x.com/random"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="X" />
        </a>
        <a
          href="https://email.com/random"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={mail} alt="Email" />
        </a>
      </section>
    </footer>
  );
}
