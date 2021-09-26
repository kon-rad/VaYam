import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import Logo from "../../../assets/images/brand-logo.png";
import LogoRed from "../../../assets/images/brand-logo-red.png";
import "./Topbar.css";

interface Props {}

const Topbar = (props: Props) => {
  const [current, setCurrent] = useState({
    current: "home",
  });
  const [offset, setOffset] = useState(0);
  const handleClick = (e: any) => {
    setCurrent({ current: e.key });
  };

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, [offset]);
  return (
    <div className={offset > 70 ? "topbar scrolled" : "topbar"}>
      <div className="container">
        <div className="logo">
          <img
            src={offset > 70 ? LogoRed : Logo}
            alt="VaYam"
            className="brand-logo"
          />
        </div>
        <nav className="ch-main-navigation">
          <Menu
            onClick={(e) => handleClick(e)}
            selectedKeys={[current.current]}
            mode="horizontal"
            className="top-menu"
          >
            <Menu.Item key="home" className="nav-item">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">About Us</Link>
            </Menu.Item>
            <Menu.Item key="/roadmap">
              <Link to="/roadmap">Roadmap</Link>
            </Menu.Item>
            <Menu.Item key="/faq">
              <Link to="/faqs">FAQ's</Link>
            </Menu.Item>
          </Menu>
        </nav>
      </div>
    </div>
  );
};

export default Topbar;
