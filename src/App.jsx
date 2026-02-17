import SignUpPage from './Pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router';
import {SignInPage} from "./Pages/Signin";
import {Dashboard} from "./Pages/dashboard";
import { Provider } from 'react-redux';
import store from './store/store'
function App() {

  return (
    <BrowserRouter>
    <Provider store = {store } >
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  )
};

export default App
