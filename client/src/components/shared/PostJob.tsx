import MemberComponent from "./MemberComponent";
import "./PostJob.css";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { vayamAddress } from '../../contracts/config';

import VaYam from '../../contracts/artifacts/contracts/VaYam.sol/VaYam.json';

interface Props {
}
const PostJob = (props: Props) => {
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

    const accHash = '0x0c8b5ee7b4282bdc09abc2757b135cd471f739f7b738871421b7936e2ff484c4';

    const title = 'second job title';
    const desc = 'second job description';
    const pricePerWeek = '9';
    const price = ethers.utils.parseUnits(pricePerWeek, 'ether');

    const transaction = await vayamContract.createJob(accHash, title, desc, pricePerWeek);
    await transaction.wait();
    console.log('createJob :D : ', transaction);
  }

  return (
    <div className="PostJob__wrapper">
      <div className="PostJob">
          <h3>Post a job</h3>
          <div className="PostJob__section">
            <div className="PostJob__title">
              Title
            </div>
            <div className="PostJob__input">
              <input type="text" name="title" className="PostJob__titleInput" />
            </div>
          </div>
          <div className="PostJob__section">
            <div className="PostJob__title">
              Description
            </div>
            <div className="PostJob__input">
              <input type="text" name="description" className="PostJob__titleInput" />
            </div>
          </div>
          <button className="PostJob__submitBtn" onClick={handleSubmit}>Create Account</button>
        </div>
    </div>
  );
};

export default PostJob;