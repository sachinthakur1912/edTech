import React, { useState } from "react";
import ItalicText from "../components/core/login/ItalicText";
import signupImage from "../assets/Images/signup.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import frameImg from "../assets/Images/frame.png";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [currentTab, setCurrentTab] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    const signupData = {
      ...formData,
      currentTab,
    };
    console.log(signupData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setCurrentTab("Student");
    toast.success("Sign up successful");
  };

  return (
    <div className="flex mx-auto mt-20 items-center justify-around ">
      <div className="flex flex-col gap-9 text-white w-[30%] ">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold text-white">
            Join the millions learning to code with StudyNotion for free
          </h2>
          <p className="text-richblack-100 ">
            Build skills for today, tomorrow, and beyond.{" "}
            <ItalicText text={"Education to future-proof your career."} />.
          </p>
        </div>
        <div className="text-richblack-200 bg-richblack-800 w-fit p-1 rounded-full flex flex-row gap-[5px]">
          <button
            type="radio"
            className={`py-[6px] px-[18px] rounded-full ${
              currentTab === "Student" ? "bg-richblack-900 text-white" : ""
            }`}
            onClick={() => setCurrentTab("Student")}
          >
            Student
          </button>
          <button
            type="radio"
            className={`1py-[6px] px-[18px] rounded-full ${
              currentTab === "Instructor" ? "bg-richblack-900 text-white" : ""
            }`}
            onClick={() => setCurrentTab("Instructor")}
          >
            Instructors
          </button>
        </div>
        <form className="flex flex-col gap-9" onSubmit={submitHandler}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between ">
              <label className="flex flex-col gap-[6px]">
                <p className="text-sm">
                  First Name <span>*</span>
                </p>
                <input
                  className="rounded-md px-3 py-2 bg-richblack-800"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <label className="flex flex-col gap-[6px]">
                <p className="text-sm">
                  Last Name <span>*</span>
                </p>
                <input
                  className="rounded-md p-3 py-2 bg-richblack-800"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
            </div>
            <label className="flex flex-col gap-[6px]">
              <p className="text-sm">
                Email Adrress <span>*</span>
              </p>
              <input
                className="rounded-md w-full bg-richblack-800 p-3 py-2"
                placeholder="Enter Email Address"
                name="email"
                value={email}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            </label>
            <div className="flex justify-between ">
              <div className="relative">
                <label className="flex flex-col gap-[6px] ">
                  <p className="text-sm">
                    Password <span>*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3"
                  placeholder="Password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                <span
                  className="cursor-pointer absolute bottom-[20%] right-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="relative">
                <label className="flex flex-col gap-[6px] ">
                  <p className="text-sm">
                    Confirm Password <span>*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3"
                  placeholder="Confirm Password"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                <span
                  className="cursor-pointer absolute bottom-[20%] right-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="w-[30%] relative">
        <img
          src={signupImage}
          alt="sinupImg"
          className="absolute bottom-4 right-4"
        />
        <img src={frameImg} alt="frame" />
      </div>
    </div>
  );
}
