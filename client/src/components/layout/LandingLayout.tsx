import React from "react";
import { Topbar, Footer } from "./common";

interface Props {
  children: any;
}

const LandingLayout = (props: Props) => {
  return (
    <>
      <main>
        <Topbar />
        {props.children}
        <Footer />
      </main>
    </>
  );
};

export default LandingLayout;
