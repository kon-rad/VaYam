import React from "react";
import Heading from '../../components/shared/Heading';
import CreateAccount from '../../components/shared/CreateAccount';

interface Props {}

const Start = (props: Props) => {
  return (
        <div>
            <Heading title="Get Started" description="Create your account here" />
            <CreateAccount />
        </div>
    );
};

export default Start;
