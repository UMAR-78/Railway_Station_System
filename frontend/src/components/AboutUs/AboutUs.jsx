import React from "react";
import "./AboutUs.css";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="AboutSection">
        <div>
          <img
            className="AboutImage"
            src="pexels-trev-adams-12289271.jpg"
            alt=""
          />
        </div>
        <div>
          <h1>RailBooker.com</h1>
          <p>
            At RailBooker, we are passionate about simplifying your rail travel
            experience. With a commitment to convenience and exceptional
            service, we strive to connect travelers with seamless and enjoyable
            journeys. Explore the world by rail with confidence, knowing that
            RailBooker is your trusted partner for personalized and memorable
            travel adventures.
          </p>
        </div>
      </div>
      <div className="TermsCondition">
        <h1>Terms & Conditions</h1>
        <p className="TCs">
          1. Acceptance of Terms: By accessing RailBooker.com and using our
          services, you agree to comply with and be bound by these terms and
          conditions. If you do not agree with any part of these terms, you may
          not use our services. 2. Booking and Payments: RailBooker.com
          facilitates the booking of rail tickets and related services. All
          bookings are subject to availability. Users are responsible for
          providing accurate and complete payment information. Payment is
          processed securely, and users consent to the terms of our payment
          gateway provider. 3. Cancellations and Refunds: Cancellation policies
          vary based on the specific rail service providers. Users are
          encouraged to review cancellation policies before making bookings.
          Refund eligibility is determined by the terms of the rail service
          provider. RailBooker.com will facilitate refund requests according to
          these terms. 4. User Accounts: Users are responsible for maintaining
          the confidentiality of their account information and passwords.
          RailBooker.com reserves the right to terminate or suspend user
          accounts for any reason, including violation of these terms. 5.
          Privacy and Data Security: RailBooker.com is committed to protecting
          user privacy. Our Privacy Policy outlines how user data is collected,
          used, and protected. Users consent to the collection and use of their
          information in accordance with our Privacy Policy. 6. Intellectual
          Property: All content and materials on RailBooker.com, including
          logos, trademarks, and software, are the property of RailBooker.com
          and are protected by intellectual property laws. Users may not
          reproduce, distribute, or modify any content without explicit
          permission. 7. Limitation of Liability: RailBooker.com is not liable
          for any direct, indirect, incidental, or consequential damages arising
          from the use of our services or inability to access the website. Users
          use our services at their own risk. 8. Changes to Terms:
          RailBooker.com reserves the right to modify these terms at any time.
          Users are responsible for reviewing the terms regularly. Continued use
          of RailBooker.com after changes constitutes acceptance of the modified
          terms. 9. Governing Law: These terms and conditions are governed by
          and construed in accordance with the laws of [Your Jurisdiction]. Any
          disputes arising from these terms will be subject to the exclusive
          jurisdiction of the courts in [Your Jurisdiction].
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
