import SignUpPage from './Pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router';
import {SignInPage} from "./Pages/Signin";
import { Provider } from 'react-redux';
import store, {persistedStore} from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import Publicroutes from "../src/routes/PublicRoutes";
import ProtectedRoutes from './routes/ProtectedRoutes';
import {Toaster} from "react-hot-toast"
import Profile from './features/accounts/components/profile';
import Billing from './features/billings/components/billing';
import DashboardLayout from './layouts/DashboardLayout';

function App() {

  return (
    <BrowserRouter>
    <Provider store = {store } >
      <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
        <Toaster position="top-right" />
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
            <Route element={<DashboardLayout />} >
              <Route path='/dashboard' element={<Profile />} />
              <Route path='/accounts' element={<Profile />} />
              <Route path='/billings' element={<Billing />} />
            </Route>
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
    </BrowserRouter>
  )
};

export default App
