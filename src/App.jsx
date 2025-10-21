import React from "react";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";

import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
<>
 <Routes>

     <Route path="/" element={<Home/> } />
   <Route path="/signup" element={<Register />} />
   <Route path="/login" element={<Login/>} />
   <Route path="/" element={<Home />} /> home page
  
  
  </Routes> 


</>
  );
};

export default App;
