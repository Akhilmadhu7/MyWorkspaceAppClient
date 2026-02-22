import SignUpPage from './Pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router';
import {SignInPage} from "./Pages/Signin";
import {Dashboard} from "./Pages/dashboard";
import { Provider } from 'react-redux';
import store, {persistedStore} from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import Publicroutes from "../src/routes/PublicRoutes";
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {

  return (
    <BrowserRouter>
    <Provider store = {store } >
      <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
        <Routes>
          <Route 
            path='/signin' 
            element={
              <Publicroutes >
                <SignInPage />
              </Publicroutes>
            } 
          />
          <Route path='/signup' element={<SignUpPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
    </BrowserRouter>
  )
};

export default App
