import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Registration = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigation = useNavigate();

  const handleSubmit = () => {
    var checkNumber = /^\d{10}$/;
    if (checkNumber.test(mobile)) {
      const userData = {
        name: name,
        number: mobile,
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };
      console.log("hello>>>>", userData);
      fetch("http://localhost:3001/save/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          mobile: mobile,
        }),
      });
      navigation("/quiz");
    } else {
      alert("Enter Valid mobile number");
    }
  };

  return (
    <div className="landing-body">
      <div className="w-100 d-flex justify-content-center">
        <div className="welcome-bg shadow-lg d-flex align-items-center">
          <div className="content w-100 text-center">
            <div className="heading">
              <h4 className="text-uppercase">Registration</h4>
            </div>
            <div className="form-data">
              <div className="row">
                <div className="col-5">
                  <div className="row mx-0">
                    <div className="col-2 d-flex justify-content-start">
                      <p className="my-auto">Name</p>
                    </div>
                    <div className="col-8">
                      <input
                        className="inputClass form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="row mx-0">
                    <div className="col-4 d-flex justify-content-end">
                      <p className="text-end my-auto">Mobile no.</p>
                    </div>
                    <div className="col-8">
                      <input
                        className="form-control inputClass"
                        type="number"
                        pattern="[0-9]{10}"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <input
                    className="btn btn-success w-100 btn-submit"
                    type="button"
                    value={"Submit"}
                    onClick={() => {
                      handleSubmit();
                      //navigation("/quiz");
                    }}
                  />
                </div>
              </div>
              <hr />
              <div className="rules">
                <p className="text-uppercase mb-2 color-green">
                  rules and regulations
                </p>
                <div className="row mx-0">
                  <div className="col-6">
                    <p className="text-start">
                      a) One Person can only participate only once.
                    </p>
                    <p className="text-start">
                      b) NTPC's decision final and will not be subjected to any
                      change.
                    </p>
                    <p className="text-start">
                      c) The participants shall not be allowed to use mobile or
                      other electronic instruments.
                    </p>
                    <p className="text-start">
                      d) One with all right answers will be eligible for a gift.
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-start">
                      e) You will get a call/mail from us if you have clicked
                      all the 10 right answers.
                    </p>
                    <p className="text-start">
                      f) You can collect your gift from the exhibition or from
                      the NTPC Corporate Office at your convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
