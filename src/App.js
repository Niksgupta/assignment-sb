import HomePage from "./components/HomePage";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import PostedJobs from "./components/PostedJobs";
import NoAccess from "./components/NoAccess";

function App() {
  return (
    <div>
      <Routes>
        <Route exact={true} path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/postedjobs" element={<PostedJobs />}></Route>
        <Route path="/noaccess" element={<NoAccess />}></Route>
        <Route path="*" element={<NoAccess />}></Route>
      </Routes>
    </div>
  );
}

export default App;
