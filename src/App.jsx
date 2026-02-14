import SignUpPage from './Pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router';
import {SignInPage} from "./Pages/Signin";
import {Dashboard} from "./Pages/dashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App
