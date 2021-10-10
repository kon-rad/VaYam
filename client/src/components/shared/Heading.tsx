import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import MemberComponent from "./MemberComponent";
import "./Heading.css";

interface Props {
  title: string;
  description: string;
}

const Heading = (props: Props) => {
  const { title, description } = props;
  return (
      <div className="Heading">
          <h3 className="Heading__title">
              {title}
          </h3>
            <div className="Heading__desc">
                {description}
            </div>
      </div>
  );
};

export default Heading;
