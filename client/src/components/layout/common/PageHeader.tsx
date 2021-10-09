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
            <h1>Why We Exist?</h1>
            <p>
              We aim to make the world better by building tools that
              empower people to make a living using their creativity and have self determination.
            </p>
            <Link to="/whitepaper" className="read-more">
              Whitepaper
            </Link>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
