import React from "react";
import "./Footer.scss";

const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <h3>copy right &copy;{currentYear}</h3>
    </footer>
  );
};

export default Footer;
