import React from "react";


// import things from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;