import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
//import "./CardComponent.css";

interface Props {
  link: string;
  index: number;
  data: {
    id: number;
    title: string;
    content: string;
    image: string;
  };
}

const CardComponent = (props: Props) => {
  const { link, data } = props;
  return (
    <div key={data.id}>
      <Card
        className="card"
        cover={<img alt="example" src={data.image} className="card-image" />}
      >
        <h4>{data.title}</h4>
        <p>
          {data.content}
          <Link to={`${link}`}>more</Link>
        </p>
      </Card>
    </div>
  );
};

export default CardComponent;
