import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import History from "./Pages/History";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
// import Results from "./Pages/Results";
import Toggle from "./Components/Toggle";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/history" element={<History />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
