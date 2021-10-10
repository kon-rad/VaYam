import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import "./PageHeader.css";

const { Header } = Layout;
interface Props {}

const PageHeader = (props: Props) => {
  return (
    <Header className="header">
      <div className="container">
        <Row>
          <Col span={18}> </Col>
          <Col span={6} className="whitepaper-info">
            <h1 className="title">VaYam</h1>
            <h1 className="text-background">Change the way you work</h1>
            <p className="PageHeader__subheading text-background">
              Amplifly your creativity by having a platform where you can earn income from your skills.
            </p>
            <Link to="/get-started" className="read-more">
              Get Started
            </Link>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
