import { useState } from 'react';
import MemberComponent from "./MemberComponent";
import "./PostJob.css";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { vayamAddress } from '../../contracts/config';

import VaYam from '../../contracts/artifacts/contracts/VaYam.sol/VaYam.json';
import SkeletonInput from "antd/lib/skeleton/Input";

interface Props {
}
const PostJob = (props: Props) => {
    const [data, setData] = useState<any>({});
  const handleSubmit = () => {
    console.log('handleSubmit');
    submitForm();
  }

  const submitForm = async (): Promise<any> => {
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

    // todo: get account hash per current user
    // account 2
    // const accHash = '0x0c8b5ee7b4282bdc09abc2757b135cd471f739f7b738871421b7936e2ff484c4';
    // account 3
    const accHash = '0x905d5a504d87ffee4fb52050ebe30a0e56e7cd49c99d5f1ca971afcce96f613d';

    const title = data.title;
    const desc = data.desc;
    const pricePerWeek = data.price;
    const price = ethers.utils.parseUnits(pricePerWeek, 'ether');

    const transaction = await vayamContract.createJob(accHash, title, desc, price);
    await transaction.wait();
    console.log('createJob :D : ', transaction);
  }
  const handleChange = (newData: any) => {
      setData({
          ...data,
          [newData.key]: newData.value,
      })
  }

  return (
    <div className="CreateAccount__wrapper">
      <div className="PostJob">
          <h3 className="">Post a service offered</h3>
          <div className="CreateAccount__section">
            <div className="CreateAccount__title">
              Title
            </div>
            <div className="CreateAccount__input">
              <input onChange={(e) => handleChange({ key: 'title', value: e.target.value })} placeholder="what should this service be called?" type="text" name="title" className="CreateAccount__titleInput" />
            </div>
          </div>
          <div className="CreateAccount__section">
            <div className="CreateAccount__title">
              Description
            </div>
            <div className="CreateAccount__input">
              <textarea onChange={(e) => handleChange({ key: 'desc', value: e.target.value })} placeholder="what kind of service is this?" name="description" className="CreateAccount__descInput"></textarea>
            </div>
          </div>
          <div className="CreateAccount__section">
            <div className="CreateAccount__title">
              Price per Month
            </div>
            <div className="CreateAccount__input">
              <input onChange={(e) => handleChange({ key: 'price', value: e.target.value })} placeholder="enter Ethereum amount" type="text" name="title" className="CreateAccount__titleInput" />
            </div>
          </div>
            <button className="btn-primary CreateAccount__submitBtn" onClick={handleSubmit}>
              Post Service
            </button>
        </div>
    </div>
  );
};

export default PostJob;