import { Link } from "react-router-dom";
import { Card } from "antd";
import MemberComponent from "./MemberComponent";
import "./JobCard.css";
import CommunityData from "../../utilities/communities.json";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import FiveStars from '../../assets/images/stars4.png';

type Member = {
  id: number;
  name: string;
  image: string;
};

interface Props {
  index: number;
  job: any;
}

const JOB_HASH_INDEX = 0;
const ACCOUNT_HASH_INDEX = 1;
const TITLE_INDEX = 2;
const DESCRIPTION_INDEX = 3;
const ACC_OWNER_INDEX = 4;
const PRICE_PER_WEEK_INDEX = 5;

const JobCard = (props: Props) => {
  const { job, index } = props;
  let currentUser: any;

  const handleHire = async () => {
    console.log('handleHire triggered');
    await initialize();
    console.log('job[ACC_OWNER_INDEX]', job[ACC_OWNER_INDEX]);
    
    await makeFlow(job[ACC_OWNER_INDEX]);
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
        
    currentUser = sf.user({
        address: walletAddress[0],
        token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
    });
    const details = await currentUser.details();
    console.log(details);
  }

  const makeFlow = async (recipientAddress: string) => {
    debugger;
    console.log(recipientAddress);
    
    // 0x2880f6f8a913841ea336e58459821c8f25f97470
      await currentUser.flow({
        recipient: recipientAddress,
        flowRate: '385802469135802'
    });
    
    const details = await currentUser.details();
    console.log(details);
  }
  const fire = async () => {
    // acc 2
    await initialize();
    await stopFlow('0x2880f6f8a913841ea336e58459821c8f25f97470');
  }
  const stopFlow = async (recipientAddress: string) => {
    // 0x2880f6f8a913841ea336e58459821c8f25f97470
    await currentUser.flow({
      recipient: recipientAddress,
      flowRate: '0'
    });
    
    const details = await currentUser.details();
    console.log('stop: ', details);
  }

  let price = ethers.utils.formatUnits(job[PRICE_PER_WEEK_INDEX].toString(), 'ether');
  console.log('price: ', price);
  const stars = (3 + (Math.random() * 2)).toFixed(2);
  
  return (
      <Card
        key={job[0]}
        cover={
          <img alt="example" src={CommunityData[index % 3].image} className="group-image" />
        } 
        bordered={false}
      >
        <div className="JobCard__body">
          <h4>{job[TITLE_INDEX]}</h4>
          <div className="JobCard__reviewsWrapper">
            <div className="JobCard__reviewsOverlay">
              {stars} stars
              {/* <img src={FiveStars} alt="" className="JobCard__reviews" /> */}
            </div>
          </div>
          <p>{job[DESCRIPTION_INDEX]}</p>
          <div className="JobCard__price">{price} ETH</div>
          <Link to={`/job/${job.id}`}>learn more</Link>
        </div>
        <button onClick={fire} className="JobCard__hire">
          HIRE
        </button>
        <div className="group-members">
          {/* {members.map((member) => (
            <MemberComponent
              image={member.image}
              name={member.name}
              id={member.id}
            />
          ))} */}
        </div>
      </Card>
  );
};

export default JobCard;
