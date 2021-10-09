import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import LandingLayout from "../../components/layout/LandingLayout";
import CommunityData from "../../utilities/communities.json";
import CommunityCard from "../../components/shared/CommunityCard";
import { useEffect } from "react-router/node_modules/@types/react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';


const { Content } = Layout;

// import Market from '../artifacts/contracts/InLightMarket.sol/InLightMarket.json';


declare global {
  interface Window {
    ethereum: any
  }
}
interface Props {}
//const CommunityData = CommunityData.slice(0, 3);

const Home = (props: Props) => {

  let carol: any;

  useEffect(() => {
    initialize();
  }, [])

  const connectToMarket = () => {
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
  }

  const initialize = async () => {
    const SuperfluidSDK = require("@superfluid-finance/js-sdk");
    const { Web3Provider } = require("@ethersproject/providers");


    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);


    console.log('window.ethereum: ', window.ethereum);
    console.log('pre SuperfluidSDK');
    const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(connection)
    });
    console.log('pre initialized');
    await sf.initialize()
    console.log('initialized');

    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });

    console.log('addr: ', walletAddress);
        
    carol = sf.user({
        address: walletAddress[0],
        token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
    });
    const details = await carol.details();
    console.log(details);

  }
  const makeFlow = async () => {
    // 0x2880f6f8a913841ea336e58459821c8f25f97470
      await carol.flow({
        recipient: '0x2880f6f8a913841ea336e58459821c8f25f97470',
        flowRate: '385802469135802'
    });
    
    const details = await carol.details();
    console.log(details);
  }
  const stopFlow = async () => {
    // 0x2880f6f8a913841ea336e58459821c8f25f97470
    await carol.flow({
      recipient: '0x2880f6f8a913841ea336e58459821c8f25f97470',
      flowRate: '0'
  });
  
  const details = await carol.details();
  console.log('stop: ', details);
  }

  return (
    <LandingLayout>
      <Content>
        {/* Communities */}
        <section className="stories">
          <div className="container">
            <div className="see-all">
              <Link to="/communities">See All</Link>
            </div>
            <h3 className="heading">"Jobs"</h3>
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
