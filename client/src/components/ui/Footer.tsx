import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} Rampy. All rights reserved.</p>
      <div className="footer__links">
        {["About", "Contact", "Privacy Policy"].map((link, index) => (
          <Link
            key={index}
            href={`/${link.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
            scroll={false}
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
