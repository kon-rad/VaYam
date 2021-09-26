import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import LandingLayout from "../../components/layout/LandingLayout";
const { Content } = Layout;

interface Props {}

const Home = (props: Props) => {
  return (
    <LandingLayout>
      <Content>
        {/* Communities */}
        <section>
          <div> List of communities</div>
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
      </Content>
    </LandingLayout>
  );
};

export default Home;
