import React, { useState, useEffect } from "react";
import About from "../components/about/About";
import CircularProgress from "@mui/material/CircularProgress";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="progress">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <About />
    </div>
  );
}
