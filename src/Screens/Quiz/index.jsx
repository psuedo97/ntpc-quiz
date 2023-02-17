import React, { useEffect, useState } from "react";
import topLeft from "../../assets/tl.svg";
import topRight from "../../assets/tr.svg";
import bottomRight from "../../assets/br.svg";
import bottomleft from "../../assets/bl.svg";
import rTl from "../../assets/right-tl.svg";
import rTr from "../../assets/right-tr.svg";
import rBl from "../../assets/right-bl.svg";
import rBr from "../../assets/right-br.svg";
import wTl from "../../assets/wrong-tl.svg";
import wTr from "../../assets/wrong-tr.svg";
import wBl from "../../assets/wrong-bl.svg";
import wBr from "../../assets/wrong-br.svg";
import data from "../../data/quiz.json";
import quesData from "../../data/ques.json";
import ans from "../../data/ans.json";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setScore } from "../../action/setScore";
import { GoHome } from "react-icons/go";

const Quiz = (props) => {
  const [page, setPage] = useState(0);
  const [ques, setQues] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [a, setA] = useState(topLeft);
  const [b, setB] = useState(topRight);
  const [c, setC] = useState(bottomleft);
  const [d, setD] = useState(bottomRight);
  const [options, setOptions] = useState([]);
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [count, setCount] = useState(0);
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  const checkAnswer = async (value) => {
    var questionId = Data[page].qId;
    var answerId = Data[page].answerId;
    //console.log("Anwer Id >>>>",(value));

    if (value === answerId) {
      //console.log("Anwer Id >>>>",(value));
      setCorrectCount(correctCount + 1);
      value.includes("a") && setA(rTl);
      value.includes("b") && setB(rTr);
      value.includes("c") && setC(rBl);
      value.includes("d") && setD(rBr);
    } else {
      value.includes("a") && setA(wTl);
      value.includes("b") && setB(wTr);
      value.includes("c") && setC(wBl);
      value.includes("d") && setD(wBr);
    }

    if (page < 10) {
      await delay(1000);
      setPage(page + 1);
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const quizData = (arr, num) => {
    var newArr = [...arr].sort(() => 0.5 - Math.random());
    return newArr.slice(0, num);
  };

  useEffect(() => {
    if (count === 0) {
      var list = quizData(data,5);
      console.log(list);
      setData(list);
      var qId = list[page].qId;
      quesData.map((val) => {
        val.qId === qId && setQues(val.value);
      });
      setOptions(list[page].aId);

      var option = list[page].aId;
      option.map((val, i) => {
        if (i === 0) {
          ans.map((value) => {
            {
              value.aID === val && setOptionA(value.value);
            }
          });
        } else if (i === 1) {
          ans.map((value) => {
            {
              value.aID === val && setOptionB(value.value);
            }
          });
        } else if (i === 2) {
          ans.map((value) => {
            {
              value.aID === val && setOptionC(value.value);
            }
          });
        } else if (i === 3) {
          ans.map((value) => {
            {
              value.aID === val && setOptionD(value.value);
            }
          });
        }
      });
      setCount(count + 1);
    } else if (count > 0 && page < 5) {
      setA(topLeft);
      setB(topRight);
      setC(bottomleft);
      setD(bottomRight);
      var qId = Data[page].qId;
      quesData.map((val) => {
        val.qId === qId && setQues(val.value);
      });
      setOptions(Data[page].aId);
      var option = Data[page].aId;
      option.map((val, i) => {
        if (i === 0) {
          ans.map((value) => {
            {
              value.aID === val && setOptionA(value.value);
            }
          });
        } else if (i === 1) {
          ans.map((value) => {
            {
              value.aID === val && setOptionB(value.value);
            }
          });
        } else if (i === 2) {
          ans.map((value) => {
            {
              value.aID === val && setOptionC(value.value);
            }
          });
        } else if (i === 3) {
          ans.map((value) => {
            {
              value.aID === val && setOptionD(value.value);
            }
          });
        }
      });
    } else {
      props.setScore(correctCount);
      console.log(correctCount);
      navigate("/result");
      setPage(0);
      setCorrectCount(0);
      setCount(0);
    }
  }, [page]);

  const goHome = () => {
    navigate("/");
    setPage(0);
    setCorrectCount(0);
    setCount(0);
  };
  return (
    <div className="landing-body-quiz">
      <div className="w-100 height-100 d-flex justify-content-center">
        <div className="content-quiz">
          <div
            className="home-div d-flex align-items-center cursor"
            onClick={() => goHome()}
          >
            <GoHome className="home-btn" />{" "}
            <span className="home-text">&nbsp;Home</span>
          </div>
          <div className="question" style={{ height: '60px'}}>
            <p className="color-green text-center">{ques}</p>
          </div>
          <div className="answer">
            <div className="row mx-0">
              {options.map((val, i) => {
                if (i === 0) {
                  return (
                    <div key={i} className="col-6 text-end top">
                      <img
                        className="optionImg cursor"
                        src={a}
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      />
                      <p
                        className="optionA text-start cursor"
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      >
                        {optionA}
                      </p>
                    </div>
                  );
                } else if (i === 1) {
                  return (
                    <div key={i} className="col-6 top">
                      <img
                        className="optionImg cursor"
                        src={b}
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      />
                      <p
                        className="optionB cursor"
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      >
                        {optionB}
                      </p>
                    </div>
                  );
                } else if (i === 2) {
                  return (
                    <div key={i} className="col-6 text-end">
                      <img
                        className="optionImg cursor"
                        src={c}
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      />
                      <p
                        className="optionC text-start cursor"
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      >
                        {optionC}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="col-6">
                      <img
                        className="optionImg cursor"
                        src={d}
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      />
                      <p
                        className="optionD cursor"
                        onClick={() => {
                          checkAnswer(val);
                        }}
                      >
                        {optionD}
                      </p>
                    </div>
                  );
                }
              })}
            </div>

            {/* <div className="row top">
              <div className="col-6">
                <img className="optionImg" src={topLeft} />
                <p className="optionA ">{optionA}</p>
              </div>
              <div className="col-6">
                <img className="optionImg" src={topRight} />
                <p className="optionB">{optionB}</p>
              </div>
            </div>
            <div className="row bottom">
              <div className="col-6">
                <img className="optionImg" src={bottomleft} />
                <p className="optionC">{optionC}</p>
              </div>
              <div className="col-6">
                <img className="optionImg" src={bottomRight} />
                <p className="optionD">{optionD}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setScore: (val) => dispatch(setScore(val)),
});
export default connect(null, mapDispatchToProps)(Quiz);
