import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../FolderApi/api.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { serverurl } = useContext(ApiContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // backend call
    axios
      .get(`${serverurl}/api/user/`, { withCredentials: true }) // include cookies for token
      .then((res) => {
        console.log(" Authenticated user:", res.data);;
    
        setUser(res.data.user || res.data); // adjust as per your backend response
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log("🚫 Unauthorized, redirecting to login...");
          navigate("/login"); // 👈 redirect to login
        } else {
          console.error("❌ Error fetching user:", err);
        }
      });
  }, [serverurl, navigate]);

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Home;
