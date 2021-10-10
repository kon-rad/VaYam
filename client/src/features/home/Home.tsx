import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { Header } from '../../components/layout/common';
import JobCard from "../../components/shared/JobCard";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import './Home.css';

import { vayamAddress } from '../../contracts/config';

import VaYam from '../../contracts/artifacts/contracts/VaYam.sol/VaYam.json';

// import Market from '../artifacts/contracts/InLightMarket.sol/InLightMarket.json';

declare global {
  interface Window {
    ethereum: any
  }
}
interface Props {}
//const CommunityData = CommunityData.slice(0, 3);

const Home = (props: Props) => {
  const [jobs, setJobs] = useState(Array());

  useEffect(() => {
    loadAllJobs();
  }, [])

  // const connectToMarket = () => {
  //   const marketContract = new ethers.Contract(
  //     nftMarketAddress,
  //     Market.abi,
  //     provider
  //   );
  // }



  const loadAllJobs = async (): Promise<any> => {
    const web3Modal = new Web3Modal({
      network: 'goerli',
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
  
    const vayamContract = new ethers.Contract(
      vayamAddress,
      VaYam.abi,
      signer
    )
    const data = await vayamContract.getAllAccountHashes();
    console.log('data :D : ', data);
    const newJobs = await Promise.all(data.map(getJobData));
    console.log('all done: ', newJobs);
    // getJobData(data[0])
    debugger;
    let nj: any = [];
    newJobs.forEach((item: any) => {
      nj.push(...item);
    });

    setJobs([...jobs, ...nj]);
  }

  const getJobData = async (accHash: string) => {
    const web3Modal = new Web3Modal({
      network: 'goerli',
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
  
    const vayamContract = new ethers.Contract(
      vayamAddress,
      VaYam.abi,
      signer
    )
    const newJobs = await vayamContract.fetchAllActiveJobsPerAccount(accHash);
    console.log('fetchAllJobsPerAccount jobs in getJobData: ', newJobs);
    // setJobs([...jobs, ...newJobs]);
    return newJobs
  }

  const style = { background: '#0092ff', padding: '8px 0' };
  console.log('render jobs: ', jobs);
  
  return (
    <React.Fragment>
        <Header />
        {/* Communities */}
        <section className="stories">
          <div className="container">
            <div className="see-all">
              <Link to="/communities">See All</Link>
            </div>
            <h3 className="heading">Services Offered</h3>
            <div className="home__row">
            {jobs.map((job, index) => (
                <div className="home__card">
                  <JobCard index={index} job={job} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About us */}
        <section className="about">
          <div className="container">
            <h3 className="heading">About Us</h3>
            <div className="content">
              <p>
                <strong>
                  We are a simple to use job platform, where anyone can offer their services for weekly payments.
                </strong>
                <p>We are driven by a mission to be the protocol for people to make a living that allows for greater self determination and creativity.</p>
              </p>
            </div>
            <Link to="/about" className="read-more center">
              Read More
            </Link>
          </div>
        </section>

        {/* Roadmap */}
    </React.Fragment>
  );
};

export default Home;
