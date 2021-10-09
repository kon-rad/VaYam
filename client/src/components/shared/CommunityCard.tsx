import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import MemberComponent from "./MemberComponent";
import "./CommunityCard.css";

type Member = {
  id: number;
  name: string;
  image: string;
};

interface Props {
  index: number;
  community: {
    id: number;
    title: string;
    content: string;
    number_of_member: number;
    image: string;
    members: Member[];
  };
}

const CommunityCard = (props: Props) => {
  const { community } = props;
  const members = community.members;
  return (
      <Card
        key={community.id}
        cover={
          <img alt="example" src={community.image} className="group-image" />
        } 
        bordered={false}
      >
        <Button size="small" className="btn-join">
          JOIN
        </Button>
        <h4>{community.title}</h4>
        <p>Number of member: {community.number_of_member}</p>
        <div className="group-members">
          {members.map((member) => (
            <MemberComponent
              image={member.image}
              name={member.name}
              id={member.id}
            />
          ))}
          <Link to={`/community/${community.id}`}>more</Link>
        </div>
      </Card>
  );
};

export default CommunityCard;
