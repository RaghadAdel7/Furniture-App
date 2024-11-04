import React from 'react'
import "./About.css"
import Avatar from "@mui/material/Avatar";
import team from "./personal.jpeg";

export default function About() {
  return (
    <div className="about-container">
      <section>
        <h2>Our Story</h2>
        <p>We started with a simple idea...</p>
      </section>

      <section>
        <h2>Mission</h2>
        <p>Our mission is to...</p>
      </section>

      <section>
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <Avatar src={team} 
            alt="Raghad Alessa" 
            className="team-image" 
            />
            <h3>Raghad Alessa</h3>
            <p>Co-founder</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Our Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Customer Satisfaction</li>
        </ul>
      </section>
    </div>
  );
}
