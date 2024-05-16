import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CallApi } from "../callApi";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Username must be minimum 2 characters')
      .max(50, 'Username must not be more than 50 characters')
      .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores')
      .required('Username is required'),
    name: Yup.string()
      .min(2, 'Name must be minimum 2')
      .max(100, 'Name must not be more than 100 characters')
      .required('Name is required'),
    lastname: Yup.string()
      .min(2, 'Lastname must be minimum 2')
      .max(100, 'Lastname must not be more than 100 characters'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .matches(/^[0-9]*$/, 'Phone number must contain only digits')
      .required('Phone number is required'),
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .max(100, 'Address must be at most 100 characters')
      .required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values) => {
    console.log(values, 'may value');

    // e.preventDefault();
    try {
      const requestData = {
        username: values.username,
        password: values.password,
        mobile_number: values.phone,
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        address: values.address
      }
      const response = await CallApi("POST", "auth/signup", requestData);
      console.log('signupresponse', response);
      if (response.status === 1) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.warn("Email or password is incorrect");
      }

    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={formik.handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.username}
                onChange={formik.handleChange}

              />
              {formik.touched.username && formik.errors.username && (
                <div className="error">{formik.errors.username}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Lastname
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="error">{formik.errors.lastname}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.email}
                onChange={formik.handleChange}

              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.phone}
                onChange={formik.handleChange}

              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Adress
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.address}
                onChange={formik.handleChange}

              />
              {formik.touched.address && formik.errors.address && (
                <div className="error">{formik.errors.address}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Repeat Password
              </label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}

              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
