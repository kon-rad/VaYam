import React from "react";
import { Topbar, Header, Footer } from "./common";

interface Props {
  children: any;
}

const LandingLayout = (props: Props) => {
  return (
    <>
      <main>
        <Topbar />
        <Header />
        {props.children}
        <Footer />
      </main>
    </>
  );
};

export default LandingLayout;
