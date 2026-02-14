import { useState } from "react";
import {Input} from "../ui/input";
import {Link} from "react-router";

export const SignIn = () => {

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        // Handle input changes if needed
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <section className="bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-[#f9f9f9] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <Input
                  type={"email"}
                  name={"email"}
                  id={"email"}
                //   value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="your@mail.com"
                  required={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <Input
                  type={"password"}
                  name={"password"}
                  id={"password"}
                //   value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required={true}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#0a65ef] hover:bg-[#2749cf] hover:cursor-pointer focus:outline-2 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                SignIn
              </button>
              <p className="text-sm font-light text-white">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#0a65ef] hover:underline hover:text-[#2749cf] hover:cursor-pointer"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
