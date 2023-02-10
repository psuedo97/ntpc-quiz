import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const Registration = () => {
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const navigation = useNavigate();
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [inputName, setInputName] = useState("default");
  const [keyboardVisibility, setKeyboardVisibility] = useState(false);
  const handleSubmit = () => {
    console.log("Hello>>>>",inputs.Mobile)
    var checkNumber = /^\d{10}$/;
    if (checkNumber.test(parseInt(inputs.Mobile))) {
      const userData = {
        name: inputs.Name,
        number: inputs.Mobile,
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
          name: inputs.Name,
          mobile: inputs.Mobile,
        }),
      });
      navigation("/quiz");
    } else {
      alert("Enter Valid mobile number");
    }
  };

  const onChangeAll = (inputs) => {
    console.log("Inputs changed", inputs);
    setInputs(inputs);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };
  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });

    keyboard.current.setInput(inputVal);
  };
  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  useEffect(() => {
    console.log("inputsss", inputs);
  }, [inputs]);
  useEffect(() => {
    function clickHanlder(e) {
      if (
        !(e.target.nodeName === "INPUT") &&
        !e.target.classList.contains("hg-button") &&
        !e.target.classList.contains("hg-row")
      ) {
        setKeyboardVisibility(false);
      }
    }

    window.addEventListener("click", clickHanlder);
    return window.removeEventListener("click", clickHanlder, true);
  }, []);

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
                        className="IInput inputClass form-control"
                        type="text"
                        value={getInputValue("Name")}
                        onChange={onChangeInput}
                        onFocus={() => {
                          setKeyboardVisibility(true);
                          setInputName("Name");
                        }}
                      />
                      {/* <input
                        className="inputClass form-control"
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        value={input}
                        onChange={onChangeInput}
                        onFocus={!isVisible && setIsVisible(true)}
                      /> */}
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
                        className="IIinput form-control inputClass"
                        type="numnber"
                        name="Mobile"
                        value={getInputValue("Mobile")}
                        onChange={onChangeInput}
                        onFocus={() => {
                          setKeyboardVisibility(true);
                          setInputName("Mobile");
                        }}
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

              {keyboardVisibility && (
                <KeyboardReact
                  keyboardRef={(r) => (keyboard.current = r)}
                  layoutName={layoutName}
                  onChangeAll={onChangeAll}
                  onKeyPress={onKeyPress}
                  inputName={inputName}
                />
              )}

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
