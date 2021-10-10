import React from "react";
import './PageFooter.css';
import Logo from "../../../assets/images/brand-logo.png";

interface Props {}

const PageFooter = (props: Props) => {
  return (
    <div className="Footer__wrapper">
      <div className="Footer__leftSect">
        <div className="Footer__col">
          <div className="Footer__title">Company</div>
          <div className="Footer__link">About</div>
          <div className="Footer__link">Features</div>
          <div className="Footer__link">News</div>
          <div className="Footer__link">FAQs</div>
        </div>
        <div className="Footer__col">
          <div className="Footer__title">Resource</div>
          <div className="Footer__link">Whitepaper</div>
          <div className="Footer__link">Tokens</div>
          <div className="Footer__link">Privacy Policy</div>
          <div className="Footer__link">Terms & Conditions</div>
        </div>
        <div className="Footer__col">
          <div className="Footer__title">Links</div>
          <div className="Footer__link">Token</div>
          <div className="Footer__link">Roadmaps</div>
          <div className="Footer__link">Explore</div>
          <div className="Footer__link">FAQs</div>
        </div>
      </div>
      <div className="Footer__rightSect">
        <div className="logo">
            <img
              src={Logo}
              alt="VaYam"
              className="brand-logo"
            />
        </div>
        <div className="Footer__title">VaYam</div>
        <div className="Footer__info">info@vayam.com</div>
        <div className="Footer__info">Jhatapol - 11, Lalitpur, Nepal</div>
        <div className="Footer__info">2021 &copy; VaYam.com</div>
      </div>
    </div>
  );
};

export default PageFooter;
