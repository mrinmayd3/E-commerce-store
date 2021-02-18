import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid bg-dark text-white text-center mt-3">
      <h2 className="display-4">{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
    <footer className="footer bg-dark text-center mt-auto py-3">
      <div className="container-fluid bg-success text-white py-3">
        <h4>If you have any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contract us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An amazing <span className="text-white">MERN</span> bootcamp
          </span>
      </div>
    </footer>
  </div>
);

export default Base;
