import SignUpPage from './Pages/SignUpPage'
import { BrowserRouter, Routes, Route } from 'react-router';
import {SignInPage} from "./Pages/SignIn";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App
