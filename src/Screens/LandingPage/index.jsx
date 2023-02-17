import React from "react";
import "../../style/index.css";
import ntpc from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-body">
      <div className="w-100 d-flex justify-content-center">
        <div className="welcome-bg shadow-lg d-flex align-items-center">
          {/* <div className="w-100 bg-welcome"></div> */}
          <div className="content w-100 text-center">
            <div className="row mb-4">
              <h2>Welcome</h2>
              <h4>to the</h4>
              <h2>Sukrut Quiz</h2>
            </div>
            <div className="row d-flex align-items-center px-4">
              <div className="col-1"></div>
              <div className="col-4 border border-1 border-dark blank-div"></div>
              <div className="col-2">
                <input
                  type="button"
                  className="btn btn-success w-100 btn-nav text-uppercase"
                  value="Enter"
                  onClick={()=>navigate('/quiz')}
                />
                {/* <img className="logo w-100 mt-3" src={ntpc}/> */}
              </div>
              <div className="col-4 border border-1 border-dark blank-div"></div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


// {
//   "qId" : 14,
//   "aId" : ["14a","14b","14c","14d"],
//   "answerId" : "14a"
// },