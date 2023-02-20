import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../utils/client';
import Envs from '../utils/env';
import { fetchUser } from '../utils/data';
import Spinner from './spinner';
import samplevideo from '../assets/sample.mp4';

const InvalidAccessMessageDuration = 5000 // 5 secs

type FormErrors = {
  usernameError: string | null;
  passwordError: string | null;
}

export function Login() {
  // Define login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidAccess, setInvalidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    usernameError: null,
    passwordError: null
  });
  const navigate = useNavigate();

  // init mock data
  localStorage.setItem('mockUser', JSON.stringify({
    username: 'mockuser',
    password: 'passwordformockuser'
  }));

  useEffect(() => {
    const user = fetchUser();
    if (user) {
      navigate('/');
    }
  }, []);

  const validateUserAccess = (username: string, password: string) => {
    const user = localStorage.getItem('mockUser');

    if (!user) return false;

    const parsedUser = JSON.parse(user);

    if (username === parsedUser.username && password === parsedUser.password) {
      return true;
    }

    return false;
  }

  const onChangeFieldInputs = (e: any) => {
    if (e.target.name === 'username') {
      const value = e.target.value;
      const regex = /^[a-zA-Z0-9_.-]*$/
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          usernameError: 'Only letter and number are allowed.'
        });
      } else {
        setErrors({
          ...errors,
          usernameError: null
        });
      }
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleLoginSubmit = (e: any) => {
    const existingUser = localStorage.getItem('user');

    if (existingUser) localStorage.removeItem('user');

    const isValid = validateUserAccess(username, password);

    if (!isValid) {
      setInvalidAccess(true);
      setTimeout(() => {
        setInvalidAccess(false);
      }, InvalidAccessMessageDuration);
    };

    localStorage.setItem('user', JSON.stringify({
      username
    }));

    navigate('/')

    e.preventDefault();
  }

  const handleLoginResponse = async (data: { credential: string }) => {
    setIsLoading(true);
    const verifiedTokenResponse = await client.verifyToken(data.credential);
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(verifiedTokenResponse.data));
    setIsLoading(false);
    navigate('/');
  }

  (window as any).handleLoginResponse = handleLoginResponse;

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center">
      <video
        src={samplevideo}
        className="w-full h-full object-cover"
        controls={false}
        autoPlay
        loop
        muted />
      <div className="absolute">
        <form
          className="flex flex-col w-400"
          onSubmit={handleLoginSubmit}
        >
          <label className="text-white">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            className="outline-none font-bold border-b-2 font-bold border-b-2 border-gray-200 p-2 my-3"
            onChange={onChangeFieldInputs}
          />
          {errors.usernameError && (
            <p
              className="text-red-500"
            >{errors.usernameError}</p>
          )}
          <label className="text-white">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            className="outline-none font-bold border-b-2 font-bold border-b-2 border-gray-200 p-2 my-3"
            onChange={onChangeFieldInputs}
          />
          <button
            type="submit"
            className="bg-slate-500 text-white py-3 mt-5 hover:shadow-md hover:bg-slate-400"
          >Login</button>
          <p className="text-center py-5 text-white">Or</p>
          <div className="flex justify-center">
            <div id="g_id_onload"
              data-client_id={Envs.GOOGLE_CLIENT_ID}
              data-auto_prompt="false"
              data-callback="handleLoginResponse"
            >
            </div>
            <div className="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left">
            </div>
          </div>
          {invalidAccess && (
            <div className={`transition-all duration-200 ${invalidAccess ? "opacity-100" : "opacity-0"}`}>
              <p>Username or Password is not valid!</p>
            </div>
          )}
        </form>
        {isLoading && (<Spinner message='' />)}
      </div>
    </div>
  );
}
