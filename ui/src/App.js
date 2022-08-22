import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import './App.css';
import RequireAuth from './components/RequireAuth';
import NotAuth from './components/NotAuth';
import RequireAdmin from './components/RequireAdmin';
import Users from './components/pages/Users';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = React.lazy(() => import('./components/pages/Home'));
const Login = React.lazy(() => import('./components/pages/Login'));
const Register = React.lazy(() => import('./components/pages/Register'));
const AddProduct = React.lazy(() => import('./components/pages/AddProduct'));
const EditProduct = React.lazy(() => import('./components/pages/EditProduct'));
const DisplayMap = React.lazy(() => import('./components/pages/DisplayMap'));

const PaySuccess = React.lazy(() => import('./components/pages/Success'));
const PayCancel = React.lazy(() => import('./components/pages/Cancel'));

function App() {

  return (
    <div className="App">
      <div className='container-app'>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<NotAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route element={<RequireAdmin />}>
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit" element={<EditProduct />} />
              </Route>
              <Route path="/users" element={<Users />} />
              <Route path="/displaymap" element={<DisplayMap />} />
              <Route path="/success" element={<PaySuccess />} />
              <Route path="/cancel" element={<PayCancel />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
