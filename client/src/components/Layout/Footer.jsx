import React from 'react';
import { Image, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <Link to="/" className="footer-logo">
                <Image src="/logo.svg" alt="Imdad Logo" width={120} height={36} />
              </Link>
              <p className="footer-description">
                Connecting those in need with those who can help. Making charitable giving simple, transparent, and
                effective.
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer-link">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers" className="footer-link">
                    Volunteers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="footer-contact">
                <li className="contact-item">
                  <HiPhone className="contact-icon" />
                  <span className="contact-text">+1 (234) 567-8900</span>
                </li>
                <li className="contact-item">
                  <HiMail className="contact-icon" />
                  <span className="contact-text">info@imdad.org</span>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="social-links">
                <Link to="#" className="social-link">
                  <FaFacebook className="social-icon" />
                </Link>
                <Link to="#" className="social-link">
                  <FaTwitter className="social-icon" />
                </Link>
                <Link to="#" className="social-link">
                  <FaInstagram className="social-icon" />
                </Link>
                <Link to="#" className="social-link">
                  <FaLinkedinIn className="social-icon" />
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© {new Date().getFullYear()} Imdad. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer; 