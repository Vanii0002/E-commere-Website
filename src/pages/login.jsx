
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ApiContext } from '../FolderApi/api.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/Firebase.js';

function Login() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { serverurl } = useContext(ApiContext);
  const [loading, setLoading] = useState(false);
const [githubLoading, setGithubLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverurl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

       if (res.data.success) {
      console.log(" user logged in:", res.data.user);
      navigate('/');   // Redirect to home
    } 
      else {
      console.log(" User login failed:", res.data.message);
      alert('User  login failed: ' + res.data.message);
    }

    
    } catch (error) {
      alert('Login failed!');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const googlelogin = async() => {
      try {
     const response = await signInWithPopup(auth, googleProvider);
     const user = response.user;
     const name = user.displayName;
     const email = user.email;
     
      console.log(" Google user:", user);
      console.log(" Sending to backend:", { name, email });


     const result = await axios.post(
       `${serverurl}/api/auth/GoogleLogin`,
       { 
         name, 
         email,
         googleSignIn: true 
       },
       { withCredentials: true }
     );
     
     if (result.data.success) {
       alert('Google Sign-In successful!');
       navigate('/');
     } else {
       throw new Error(result.data.message || 'Google Sign-In failed');
     }
   } catch (error) {
     console.error('Error during Google Sign-In:', error.message);
     alert('Google Sign-In failed: ' + (error.message || 'Please try again'));
   }
  };

  const githublogin = () => {
    alert('GitHub Sign-In is temporarily disabled');
  };



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#316876] via-[#000000] to-[#448db2] flex flex-col items-center justify-center py-8 px-2 relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-20 bg-[#181c1f]/60 backdrop-blur-xl shadow-lg flex items-center gap-4 px-8 py-3" style={{backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.25)'}}>
        <img className="w-12 h-12 rounded-full shadow" src="/assets/cartlogo.jpg" alt="Shopping Cart Logo" />
        <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Shopping-cart</h1>
      </header>

      {/* Card with Glassmorphism */}
      <div className="w-full max-w-md relative rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#2c3740] mt-28 overflow-hidden" style={{ background: 'rgba(77, 132, 173, 0.35)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <div className="relative w-full flex flex-col items-center">
          <span className="text-4xl font-bold mb-2 text-white">Login</span>
          <span className="text-base text-gray-300 font-medium mb-6 text-center">Welcome back! Please login to your Shopping-Cart account.</span>

          <button
            type="button"
        
            className="w-full flex items-center justify-center gap-4 bg-white text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md hover:bg-gray-100 transition mb-2 mt-2"
              onClick={googlelogin}
          >
            <img
              src="/assets/google-logo.svg"
              alt="Google Logo"
              className="w-7 h-7 bg-white rounded-full"
            />
            Sign in with Google
          </button>

                  <button
          type="button"
           disabled={githubLoading}
          className="w-full flex items-center justify-center gap-4 bg-white text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md hover:bg-gray-100 transition mb-2 mt-2"
        onClick={githublogin}>
          <img
            src="/assets/git.png"
            alt="Google Logo"
            className="w-7 h-7 bg-white rounded-full"
          />
          Sign In with Github
        </button>

          {/* Divider */}
          <div className="flex items-center w-full my-6">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>

          {/* Login Form */}
          <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                }}
              className="w-full px-4 py-2 rounded-md bg-[#232526] border border-[#2c3740] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => 
                  {setPassword(e.target.value);
                   console.log(e.target.value)}}
        className="w-full px-4 py-2 rounded-md bg-[#232526] border border-[#2c3740] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        required
      />
      <span
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
        onClick={() => setShowPassword((v) => !v)}
        tabIndex={0}

                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.02c2.64 5.052 7.538 8.23 12.066 8.23 2.042 0 4.084-.488 6.02-1.465M21.084 12.02c-.225-.443-.482-.885-.77-1.316M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.808 2.808l18.384 18.384M9.878 9.878A3 3 0 0115 12m-3 3a3 3 0 01-3-3m3 3c-2.21 0-4.21-.896-5.657-2.343m11.314 0A7.963 7.963 0 0021.066 12.02c-.225-.443-.482-.885-.77-1.316m-1.316-1.316A7.963 7.963 0 0012.066 4.07c-2.042 0-4.084.488-6.02 1.465" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md transition"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="w-full flex justify-between mt-4">
              <span className="text-gray-400">Don't have an account?</span>
              <button
                className="text-blue-400 hover:underline font-semibold"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Login;