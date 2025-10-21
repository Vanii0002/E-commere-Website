
import React, { useState, useContext } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import { ApiContext } from '../FolderApi/api.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../utils/Firebase.js';

function Register() {

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const { serverurl } = useContext(ApiContext);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (password !== confirmPassword) return;
    try {
      const res = await axios.post(`${serverurl}/api/auth/register`, {
        name,
        email,
        password
     
      },{withCredentials: true});
      console.log(res.data.user);
    
  // You can show a success message or redirect
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
      console.error('Error during signup:', error);
    }
  };

const googleSignIn = async () => {
   try {
     const response = await signInWithPopup(auth, googleProvider);
     const user = response.user;
     const name = user.displayName;
     const email = user.email;
     
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
       navigate('/login');
     } else {
       throw new Error(result.data.message || 'Google Sign-In failed');
     }
   } catch (error) {
     console.error('Error during Google Sign-In:', error.message);
     alert('Google Sign-In failed: ' + (error.message || 'Please try again'));
   }
 };


const gitlogin = () => {
  window.location.href = `${serverurl}github/login`;
  // OR Popup
const width = 600, height = 700;
const left = window.screen.width / 2 - width / 2;
const top = window.screen.height / 2 - height / 2;

window.open(
  "http://localhost:8000/api/auth/github/login",
  "GitHub Login",
  `width=${width},height=${height},top=${top},left=${left}`
);
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

        <button
          type="button"
          className="w-full flex items-center justify-center gap-4 bg-gray-300 text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md transition mb-2 mt-2"
          onClick={googleSignIn}
        
        >
          <img
            src="/assets/google-logo.svg"
            alt="Google Logo"
            className="w-7 h-7 bg-white rounded-full"
          />
          Sign Up with Google 
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-4 bg-gray-300 text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md transition mb-2 mt-2"
          onClick={gitlogin}
        
        >
          <img
            src="/assets/git.png"
            alt="GitHub Logo"
            className="w-7 h-7 bg-white rounded-full"
          />
          Sign Up with Github
        </button>

        {/* Divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* Registration Form */}
  <form className="w-full flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md bg-[#232526] border border-[#2c3740] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{
              setName(e.target.value);
              console.log(e.target.value) }} value={name}
          
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-md bg-[#232526] border border-[#2c3740] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
             onChange={(e)=>setEmail(e.target.value)} value={email}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setTouched(false); }}
              className={`w-full px-4 py-2 rounded-md bg-[#232526] border ${touched && password !== confirmPassword ? 'border-red-500' : 'border-[#2c3740]'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c1.636 4.304 5.885 7.5 9.75 7.5 2.042 0 4.09-.668 5.885-1.977M21.75 12c-.376-.99-.954-1.977-1.73-2.877M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6.364 6.364 12-12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Zm9.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              )}
            </span>
          </div>
          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setTouched(false); }}
              className={`w-full px-4 py-2 rounded-md bg-[#232526] border ${touched && password !== confirmPassword ? 'border-red-500' : 'border-[#2c3740]'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c1.636 4.304 5.885 7.5 9.75 7.5 2.042 0 4.09-.668 5.885-1.977M21.75 12c-.376-.99-.954-1.977-1.73-2.877M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6.364 6.364 12-12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Zm9.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              )}
            </span>
          </div>
          {touched && password !== confirmPassword && (
            <div className="text-red-500 text-sm font-semibold px-2">Password and Confirm Password do not match</div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition"
          >
            Register
          </button>
        </form>
        <div className="w-full text-center mt-4 text-gray-400 text-sm">
          Already have an account?{' '}
          <span className="text-blue-400 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Register