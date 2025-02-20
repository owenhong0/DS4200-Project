import React from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import ApiResponses from "./api/ApiResponses";
import Homepage from "./components/Homepage";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/api/ApiResponses" element={<ApiResponses/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;