import { useState } from 'react';
import MemberComponent from "./MemberComponent";
import "./CreateAccount.css";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';

import { vayamAddress } from '../../contracts/config';

import VaYam from '../../contracts/artifacts/contracts/VaYam.sol/VaYam.json';

interface Props {
}

const CreateAccount = (props: Props) => {
  const [data, setData] = useState<any>({});
  const handleImgUpload = () => {
    console.log('img upload');
  }
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

    const title = data.title;
    const desc = data.desc;
    // todo: implement image upload to ipfs
    const imgUrl = 'first img url';
    let accountCreationPrice = await vayamContract.getAccountCreationPrice();
    accountCreationPrice = accountCreationPrice.toString();
    console.log('accountCreationPrice: ', accountCreationPrice);

    const transaction = await vayamContract.createAccount(title, desc, imgUrl, {
      value: accountCreationPrice,
    });
    await transaction.wait();
    console.log('transaction :D : ', transaction);
  }

  const handleChange = (newData: any) => {
    setData({
        ...data,
        [newData.key]: newData.value,
    })
  }
  return (
    <div className="CreateAccount__wrapper">
      <div className="CreateAccount">
          <h3 className="CreateAccount__heading">Create an account:</h3>
          <div className="CreateAccount__sectWrapper">
            <div className="CreateAccount__imgSection">
              <div className="CreateAccount__imgWrapper">
                <img src={avatarPlaceholder} alt=""  className="CreateAccount__img"/>
                <button className="btn-secondary CreateAccount__imgBtn" onClick={handleImgUpload}>upload avatar</button>
              </div>
            </div>
            <div className="CreateAccount__sideSection">
              <div className="CreateAccount__section">
                <div className="CreateAccount__title">
                  Title
                </div>
                <div className="CreateAccount__input">
                  <input onChange={(e) => handleChange({ key: 'title', value: e.target.value })} placeholder="what should your account be called?" type="text" name="title" className="CreateAccount__titleInput" />
                </div>
              </div>
              <div className="CreateAccount__section">
                <div className="CreateAccount__title">
                  Description
                </div>
                <div className="CreateAccount__input">
                  <textarea onChange={(e) => handleChange({ key: 'desc', value: e.target.value })} placeholder="what kind of services will your account offer?" name="description" className="CreateAccount__descInput"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="CreateAccount__submitWrapper">
            <button className="btn-primary CreateAccount__submitBtn" onClick={handleSubmit}>Create Account</button>
          </div>
        </div>
    </div>
  );
};

export default CreateAccount;
