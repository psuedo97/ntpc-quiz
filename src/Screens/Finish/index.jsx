import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import smile from '../../assets/smile.png';

const Finish = (props) => {
  const {
    score: { score },
  } = props;
  const navigate = useNavigate();
  console.log("Inter>>>>>",score);
  return (
    <div className="landing-body">
      <div className="w-100 d-flex justify-content-center">
        <div className="welcome-bg shadow-lg d-flex align-items-center">
          <div className="content w-100 text-center">
            <div className="smile">
                <img src={smile} className="smileLogo"/>
            </div>
            <div className="responseDiv">
                <p className="text-uppercase">you have correctly answered {score} questions</p>
            </div>
            <div className="thankyou">
                <p className="text-capitalize">Thank you</p>
            </div>
            <input className="btn btn-home" type="button" value={'Home'} onClick={()=>navigate('/')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps,null)(Finish);
