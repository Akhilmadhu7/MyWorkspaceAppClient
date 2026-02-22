import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {setAuthCredentials} from "../../../store/authSlice";
import { authAPI } from "../../../api/AuthApi";
import {userAPI} from "../../../api/UserApi"


export const useSignIn = () => {
const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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

      const authResponse = await authAPI.login("login",formData)
      
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

      const userResponse = await userAPI.getUserById(userId, {
        Authorization: `Bearer ${accessToken}`,
        "X-Tenant-Id": tenantId,
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
    
      dispatch(setAuthCredentials({
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
  return [isLoading, formData, errors, handleChange, handleSubmit];
}