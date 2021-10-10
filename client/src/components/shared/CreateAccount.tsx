import MemberComponent from "./MemberComponent";
import "./CreateAccount.css";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { vayamAddress } from '../../contracts/config';

import VaYam from '../../contracts/artifacts/contracts/VaYam.sol/VaYam.json';

interface Props {
}

const CreateAccount = (props: Props) => {
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

    const title = 'first account title';
    const desc = 'first account description';
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

  return (
    <div className="CreateAccount__wrapper">
      <div className="CreateAccount">
          <h3>Create an account:</h3>
          <div className="CreateAccount__section">
            <div className="CreateAccount__imgWrapper">
              <h3>Upload your avatar image:</h3>
              <img src="" alt=""  className="CreateAccount__img"/>
              <button className="CreateAccount__imgBtn" onClick={handleImgUpload}>Upload file</button>
            </div>
          </div>
          <div className="CreateAccount__section">
            <div className="CreateAccount__title">
              Title
            </div>
            <div className="CreateAccount__input">
              <input type="text" name="title" className="CreateAccount__titleInput" />
            </div>
          </div>
          <div className="CreateAccount__section">
            <div className="CreateAccount__title">
              Description
            </div>
            <div className="CreateAccount__input">
              <input type="text" name="description" className="CreateAccount__titleInput" />
            </div>
          </div>
          <button className="CreateAccount__submitBtn" onClick={handleSubmit}>Create Account</button>
        </div>
    </div>
  );
};

export default CreateAccount;
