import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Screens/LandingPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Registration from "./Screens/Registration";
import Quiz from "./Screens/Quiz";
import Finish from "./Screens/Finish";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Finish />} />
      </Routes>
    </Router>
  );
}

export default App;
