"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";  // Jeśli używasz axios, lub możesz użyć fetch()
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // fetch user profile when component mounts
  useEffect(() => {
    if (userInfo) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("/api/users/profile", {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,  // Używamy tokenu z userInfo z Redux
            },
          });
          setUser(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          navigate("/login");  // Jeśli nie udało się pobrać danych (np. brak sesji), przekierowanie na stronę logowania
        }
      };

      fetchUserProfile();
    } else {
      navigate("/login");  // Jeśli nie ma userInfo, przekierowanie na stronę logowania
    }
  }, [userInfo, navigate]);  // Używamy userInfo, by wykonać kod tylko wtedy, gdy użytkownik jest zalogowany

  console.log(userInfo.name)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Account Created At:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
        <p><strong>Admin Status:</strong> {userInfo.isAdmin ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default Profile;
