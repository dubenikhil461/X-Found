import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PostItem from "./components/post-item";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-item" element={<PostItem />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
