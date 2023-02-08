import React, { useState } from 'react';

const InvalidAccessMessageDuration = 5000 // 5 secs

export function Login() {
  // Define login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidAccess, setInvalidAccess] = useState(false);

  // init mock data
  localStorage.setItem('mockUser', JSON.stringify({
    username: 'mockuser',
    password: 'passwordformockuser'
  }));

  const validateUserAccess = (username: string, password: string) => {
    const user = localStorage.getItem('mockUser');

    if (!user) return false;

    const parsedUser = JSON.parse(user);

    if (username === parsedUser.username && password === parsedUser.password) {
      return true;
    }

    return false;
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

    e.preventDefault();
  }

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <form
        className="flex flex-col w-400"
        onSubmit={handleLoginSubmit}
      >
        <label>Username</label>
        <input
          type="text"
          value={username}
          className="outline-none font-bold border-b-2 font-bold border-b-2 border-gray-200 p-2 my-3"
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          className="outline-none font-bold border-b-2 font-bold border-b-2 border-gray-200 p-2 my-3"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-500 text-white py-3 mt-5 hover:shadow-md hover:bg-slate-400"
        >Login</button>
        <p className="text-center py-5">Or</p>
        google
        {invalidAccess && (
          <div className={`transition-all duration-200 ${invalidAccess ? "opacity-100" : "opacity-0"}`}>
            <p>Username or Password is not valid!</p>
          </div>
        )}
      </form>
    </div>
  );
}
