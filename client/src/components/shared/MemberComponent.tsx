interface Props {
  id: number;
  name: string;
  image: string;
}

const Member = (props: Props) => {
  const { id, name, image } = props;
  return <img key={id} src={image} alt={name} />;
};

export default Member;
