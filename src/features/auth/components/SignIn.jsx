import  { Input } from "../../../components/ui/input";
import { Link } from "react-router";
import airx from "../../../../public/airx.png";
import { useSignIn } from "../hooks/useSignIn";

export const SignIn = () => {
  
  const [isLoading, formData, errors, handleChange, handleSubmit] = useSignIn();
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
