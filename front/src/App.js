import React from "react";


// import things from react-router-dom
import { Routes, Route } from "react-router-dom";

// import pages
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
  );
}

export default App;