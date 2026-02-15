import { useState } from "react";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import { httpPost } from "../api/httpMethods";
import airx from "../../public/airx.png";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "username required.";
    }
    if (!formData.password) {
      newErrors.password = "password required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)?.length == 0;
  };

  const handleChange = (e) => {
    // Handle input changes if needed
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    console.log("validation completed.");
    httpPost({
      url: `${API_BASE_URL}v1/auth/login`,
      data: formData,
    })
      .then((response) => {
        console.log("Login successful:", response.data);
        setIsLoading(false);
        navigate("/signup");
        // Handle successful login, e.g., store token, redirect, etc.
      })
      .catch((error) => {
        const status_code = error.response.status;
        console.log("status code:", status_code);
        if (status_code == 403) {
          const newErrors = { username: error.response.data.detail };
          setErrors(newErrors);
        }
        if (status_code == 422) {
          const errors = error.response.data.detail;
          console.error("errors", errors);
          const newErrors = {};
          for (const item of errors) {
            const errorLocation = item?.loc || "unknown";
            newErrors[errorLocation[1]] = item?.msg || "Field required.";
          }
          setErrors(newErrors);
        }
        setIsLoading(false);
        console.error("Login failed:", error.response);
        // Handle login failure, e.g., show error message to user
      });
  };

  return (
    <section className="bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-blue-900"
        >
          <img
            className="w-16 h-14 mr-2"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            src={airx}
            alt="logo"
          />
          {/* Air<span className="text-[#f4a806]">X</span> */}
        </a>
        <div className="w-full bg-[#f9f9f9] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Login to your account
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
                  name={"username"}
                  id={"username"}
                  value={formData.username || ""}
                  onChange={handleChange}
                  placeholder="your@mail.com"
                  required={true}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
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
                  value={formData.password || ""}
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
                disabled={isLoading} // ✅ Disables button & prevents form submit
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ${
                  isLoading
                    ? "bg-[#586ada] cursor-not-allowed" // Loading style
                    : "bg-[#0a65ef] hover:bg-[#2749cf] hover:cursor-pointer focus:outline-2 focus:ring-blue-800"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
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
