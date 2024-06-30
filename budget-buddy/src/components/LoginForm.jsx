import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { storeTokenInCookie } from "../../../backend/utilities/cookie";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const requestData = isRegister
      ? {
          email: data.email,
          username: data.username,
          password: data.password,
        }
      : {
          username: data.username,
          password: data.password,
        };

    try {
      let apiLink = "";
      isRegister
        ? (apiLink = "http://localhost:5000/auth/user/register")
        : (apiLink = "http://localhost:5000/auth/user/login");
      const response = await fetch(apiLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.status === 200) {
        const data = await response.json();
        storeTokenInCookie(data.token);
        dispatch(login());
        navigate("/");
      } else {
        console.error("Failed to submit data:", response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const validateConfirmPassword = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  return (
    <div className="flex justify-center items-center pt-20">
      <div>
        <Form
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isRegister ? "User Registration" : "User Login"}
          </h1>
          {isRegister && (
            <>
              <label className="block mb-2 text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full p-3 mb-3 text-black rounded-lg"
              />
              {errors.email && (
                <span className="text-red-400 text-sm mb-2">
                  This field is required
                </span>
              )}
            </>
          )}
          <label className="block mb-2 text-sm" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className="w-full p-3 mb-3 text-black rounded-lg"
          />
          {errors.username && (
            <span className="text-red-400 text-sm mb-2">
              This field is required
            </span>
          )}
          <label className="block mb-2 text-sm" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-3 mb-3 text-black rounded-lg"
          />
          {errors.password && (
            <span className="text-red-400 text-sm mb-2">
              This field is required
            </span>
          )}
          {isRegister && (
            <>
              <label className="block mb-2 text-sm" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: validateConfirmPassword,
                })}
                className="w-full p-3 mb-3 text-black rounded-lg"
              />
              {errors.confirmPassword && (
                <span className="text-red-400 text-sm mb-2">
                  Password and Confirm Password do not match!
                </span>
              )}
            </>
          )}
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              type="submit"
            >
              {isRegister ? "Register" : "Login"}
            </button>
            <button
              type="button"
              className="px-6 py-2 mt-4 font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
