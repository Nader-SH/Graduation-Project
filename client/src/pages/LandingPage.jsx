import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the Assistance Portal</h1>
      <p>
        Our mission is to provide support and assistance to the people of Gaza.
        We aim to connect those in need with resources and help them navigate
        through challenging times.
      </p>
      
      <h2>How We Help</h2>
      <ul>
        <li>Providing food and medical assistance</li>
        <li>Connecting individuals with educational resources</li>
        <li>Offering financial support for families in need</li>
        <li>Facilitating community outreach programs</li>
      </ul>

      <h2>Our Services</h2>
      <p>
        We offer a variety of services to assist individuals and families, including:
      </p>
      <ul>
        <li>Emergency food supplies</li>
        <li>Medical care and support</li>
        <li>Educational scholarships and resources</li>
        <li>Financial aid for housing and utilities</li>
      </ul>

      <h2>Testimonials</h2>
      <blockquote>
        "This portal has changed my life. I received the help I needed to support my family during tough times." - A Beneficiary
      </blockquote>
      <blockquote>
        "The assistance provided was timely and made a significant difference in our lives." - Another Beneficiary
      </blockquote>

      <h2>Get Involved</h2>
      <p>
        If you would like to contribute or need assistance, please navigate to
        the appropriate sections using the menu above.
      </p>
    </div>
  );
};

export default LandingPage;
