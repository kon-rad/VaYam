import MemberComponent from "./MemberComponent";
import "./CreateAccount.css";

interface Props {
}

const CreateAccount = (props: Props) => {
  const handleImgUpload = () => {
    console.log('img upload');
  }
  const handleSubmit = () => {
    console.log('handleSubmit');
    
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
