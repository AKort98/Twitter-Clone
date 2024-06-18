import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Signin from "./components/Signin";
import Feed from "./pages/Feed";
import PostDetails from "./pages/PostDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "./pages/User";
import Sidebar from "./components/Sidebar";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<CreateAccount />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Feed />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/:username" element={<User />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
