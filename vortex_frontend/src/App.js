import React from "react";
import { BrowserRouter, Routes ,Route, } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import VAssistant from "./pages/VAssistant";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <VAssistant/>}/>
          <Route exact path="/signup" element={<SignUp />}/>
          <Route exact path="/signin" element={<SignIn />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
