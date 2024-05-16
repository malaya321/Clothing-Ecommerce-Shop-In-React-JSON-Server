import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CallApi } from "../callApi";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    // password: "",
    username: ""
  });

  const navigate = useNavigate();
  // console.log(id, 'myuserid---<<>>>');

  const getUserData = async () => {
    try {
      const response = await CallApi("GET", "auth/userdetails/" + id);
      const data = response;
      console.log(data, 'userresponsedata<<>>>>>');
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.mobile_number,
        address: data.address,
        username: data.username
        // password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        mobile_number: userFormData.phone,
        address: userFormData.address,
        username: userFormData.username
      };
      const putResponse = await CallApi("PUT", 'auth/edituserdetails/' + id, requestBody);
      if (putResponse.status === 1) {
        console.log(putResponse, 'updateresponse');

      } else {

        console.log("Error updating profile:", response.statusText);
      }

    } catch (error) {
      console.log("Error updating profile:", error.response);

    }
  };



  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => { setUserFormData({ ...userFormData, name: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => { setUserFormData({ ...userFormData, lastname: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => { setUserFormData({ ...userFormData, email: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => { setUserFormData({ ...userFormData, phone: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Adress</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.address}
              onChange={(e) => { setUserFormData({ ...userFormData, address: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Username</span>
            </label>
            <input
              type="username"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.username}
              onChange={(e) => { setUserFormData({ ...userFormData, username: e.target.value }) }}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;