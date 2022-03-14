import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);

  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { password, email };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log('res.data', response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit"> Login</button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default LoginPage;
