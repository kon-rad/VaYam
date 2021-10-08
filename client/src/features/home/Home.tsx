import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import LandingLayout from "../../components/layout/LandingLayout";
import CommunityData from "../../utilities/communities.json";
import CommunityCard from "../../components/shared/CommunityCard";

const { Content } = Layout;

interface Props {}
//const CommunityData = CommunityData.slice(0, 3);

const Home = (props: Props) => {
  return (
    <LandingLayout>
      <Content>
        {/* Communities */}
        <section className="stories">
          <div className="container">
            <div className="see-all">
              <Link to="/communities">See All</Link>
            </div>
            <h3 className="heading">"Communities"</h3>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              {CommunityData.slice(0, 3).map((community, index) => (
                <Col span={6}>
                  <CommunityCard index={index} community={community} />
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* About us */}
        <section className="about">
          <div className="container">
            <h3 className="heading">About Us</h3>
            <div className="content">
              <p>
                <strong>
                  We help build Communities that have mission to love, care,
                  inspire and empower others.
                </strong>
                <p>We are driven with a mission</p>
              </p>
            </div>
            <Link to="/about" className="read-more center">
              Read More
            </Link>
          </div>
        </section>

        {/* Roadmap */}
      </Content>
    </LandingLayout>
  );
};

export default Home;
