import { useState } from "react";
import { Input } from "../../ui/input";
import { Link, useNavigate } from "react-router";
import { httpPost, httpGet } from "../../api/httpMethods";
import airx from "../../../public/airx.png";
import {setCredentials} from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    console.log("validation completed.");

    try{
      const authResponse = await httpPost({
        url: `${API_BASE_URL}v1/auth/login`,
        data: formData,
      })
      
      const data = authResponse?.data || {};
      console.log("Login successful:", data);
      const accessToken = data?.data?.access_token || "";
      const refreshToken = data?.data?.refresh_token || "";
      const userId = data?.data?.user_id || "";
      const tenantId = data?.data?.tenant_id || "";
      console.log("accessToken:", accessToken);
      const tokens = {
        accessToken,
        refreshToken
      }
      const userResponse = await httpGet({
          url:`${API_BASE_URL}v1/users/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Tenant-Id": tenantId,
          }
        })
        
      console.log("User details:", userResponse);
      const userDetails = {
        userId,
        userFirstName: userResponse?.data?.data?.first_name || "",
        userLastName: userResponse?.data?.data?.last_name || "",
        userEmail: userResponse?.data?.data?.email || "",
        userImageUrl: userResponse?.data?.data?.image_url || "",
      }
      
      const userRole = {
        roleId: userResponse?.data?.data?.role?.role_id || "",
        roleName: userResponse?.data?.data?.role?.role_name || ""
      }
      const tenantDetails = {
        tenantId
      }
    
      dispatch(setCredentials({
        ...userDetails,
        ...tenantDetails,
        ...userRole,
        ...tokens

      }))
      navigate("/dashboard");
    }catch(errors){
      console.error("Login failed:", errors.response);
      const status_code = errors.response.status || 500;
      const error = errors?.response?.data?.detail || "An unknown error occurred.";
        console.log("status code:", status_code);
        if (status_code == 403) {
          const newErrors = { username: error};
          setErrors(newErrors);
        }
        else if (status_code == 422) {
          // const errors = error.response.data.detail;
          console.error("errors", error);
          const newErrors = {};
          for (const item of error) {
            console.log("error item:", item);
            const errorLocation = item?.loc || "unknown";
            newErrors[errorLocation[1]] = item?.msg || "Field required.";
          }
          setErrors(newErrors);
        }
        else if (status_code == 404){
          console.error("API endpoint not found. Please check the URL and try again.");
          // const errors = error?.response?.data?.detail || "An unknown error occurred.";
          const newErrors = { username: error };
          setErrors(newErrors);
        }
        else if (status_code == 400){
          console.error("Bad request. Please check the submitted data and try again.");
          // const errors = error?.response?.data?.detail || "An unknown error occurred.";
          const newErrors = { username: error };
          setErrors(newErrors);
        }
        else {
          console.log("")
          setErrors({username:"An uknown error occurred."})
        }
      setIsLoading(false);
    }
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
