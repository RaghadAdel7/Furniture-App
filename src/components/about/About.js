import React from 'react'
import "./About.css"
import Avatar from "@mui/material/Avatar";
import Face3Icon from "@mui/icons-material/Face3";
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
            <Avatar
              src={Face3Icon}
              alt="Raghad Alessa"
              className="team-image"
            />
            <h3>Raghad Alessa</h3>
            <p>Full Stack Developer</p>
          </div>
          
          <div className="team-member">
            <Avatar
              src={Face3Icon}
              alt="Razan"
              className="team-image"
            />
            <h3>Razan</h3>
            <p>Backend Developer</p>
          </div>
          
          <div className="team-member">
            <Avatar src={Face3Icon} alt="Jomanah" className="team-image" />
            <h3>Jomanah</h3>
            <p>Backend Developer</p>
          </div>

          <div className="team-member">
            <Avatar src={Face3Icon} alt="Talal" className="team-image" />
            <h3>Talal</h3>
            <p>Backend Developer</p>
          </div>

          <div className="team-member">
            <Avatar src={Face3Icon} alt="Aziz" className="team-image" />
            <h3>Abdulaziz</h3>
            <p>Backend Developer</p>
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
