import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Signin from "./components/Signin";
import Feed from "./pages/Feed";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
