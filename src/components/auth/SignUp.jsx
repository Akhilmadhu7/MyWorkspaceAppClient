import { useState } from 'react';
import {Input} from "../../ui/input";
import {httpGet} from "../../api/httpMethods";
import {Link} from "react-router";

export default function SignupForm() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = httpGet({url: `${API_BASE_URL}v1/health/`})
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (formData.firstName.length < 3) newErrors.firstName = 'First name must be at least 3 characters';
        if (formData.firstName.length > 20) newErrors.firstName = 'First name must be less than 20 characters';

        if (formData.lastName){
            if (formData.lastName.length < 3) newErrors.lastName = 'Last name must be at least 3 characters';
            if (formData.lastName.length > 20) newErrors.lastName = 'Last name must be less than 20 characters';
        }
    
        if (!formData.email) newErrors.email = 'Email is required';
        if (formData.email.length < 10) newErrors.email = 'Provide a valid email';
        if (formData.email.length > 50) newErrors.email = 'Email must be less than 50 characters';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password.length > 30) newErrors.password = 'Password must be less than 100 characters';

        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isValid = validateForm();
    if (!isValid) {
        console.log('Form validation failed:', errors);
        return;
    }
    // Add your form submission logic here
  };

  return (
    <section className="bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-[#f9f9f9] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-black">
                  First Name
                </label>
                <Input type={"text"} name={"firstName"} id={"firstName"} value={formData.firstName || ""} onChange={handleChange} placeholder='John' required={true} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-black">
                  Last Name
                </label>
                <Input type={"text"} name={"lastName"} id={"lastName"} value={formData.lastName || ""} onChange={handleChange} placeholder='Doe' />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                  Your email
                </label>
                <Input type={"email"} name={"email"} id={"email"} value={formData.email || ""} onChange={handleChange} placeholder='your@mail.com' required={true} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                  Password
                </label>
                <Input type={"password"} name={"password"} id={"password"} value={formData.password || ""} onChange={handleChange} placeholder='••••••••' required={true}  />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-black">
                  Confirm password
                </label>
                <Input type="password" name={"confirmPassword"} id={"confirmPassword"} onChange={handleChange} value={formData.confirmPassword || ''} placeholder="••••••••" required={true}/>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#0a65ef] hover:bg-[#2749cf] hover:cursor-pointer focus:outline-2 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-white">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-[#0a65ef] hover:underline hover:text-[#2749cf] hover:cursor-pointer">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}