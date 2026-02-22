import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setAuthCredentials } from "../../../store/authSlice";
import { authAPI } from "../../../api/AuthApi";
import { userAPI } from "../../../api/UserApi";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import handleErrorResponses from "../../../api/he/handleErrorResponses";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const redirectPath = location?.state?.from?.pathName || "/dashboard";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "username required.";
    }
    if (!formData.password) {
      newErrors.password = "password required.";
    }

    setValidationErrors(newErrors);

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

    try {
      const authResponse = await authAPI.login("login", formData);

      const data = authResponse?.data || {};
      console.log("Login successful:", data);
      const accessToken = data?.data?.access_token || "";
      const refreshToken = data?.data?.refresh_token || "";
      const userId = data?.data?.user_id || "";
      const tenantId = data?.data?.tenant_id || "";
      console.log("accessToken:", accessToken);
      const tokens = {
        accessToken,
        refreshToken,
      };

      const userResponse = await userAPI.getUserById(userId, {
        Authorization: `Bearer ${accessToken}`,
        "X-Tenant-Id": tenantId,
      });

      console.log("User details:", userResponse);
      const userDetails = {
        userId,
        userFirstName: userResponse?.data?.data?.first_name || "",
        userLastName: userResponse?.data?.data?.last_name || "",
        userEmail: userResponse?.data?.data?.email || "",
        userImageUrl: userResponse?.data?.data?.image_url || "",
      };

      const userRole = {
        roleId: userResponse?.data?.data?.role?.role_id || "",
        roleName: userResponse?.data?.data?.role?.role_name || "",
      };
      const tenantDetails = {
        tenantId,
      };

      dispatch(
        setAuthCredentials({
          ...userDetails,
          ...tenantDetails,
          ...userRole,
          ...tokens,
        }),
      );
      navigate(redirectPath, { replace: true });
      toast.success("Successfully signed in!");
    } catch (errors) {
      console.error("Login failed:", errors.response);
      const errorMessage = handleErrorResponses({ errors });
      setIsLoading(false);

      if (typeof errorMessage === "object") {
        for (const key in errorMessage) {
          toast.error(`${key}: ${errorMessage[key]}`);
        }
      } else {
        toast.error(errorMessage || "Login failed. Please try again.");
      }
    }
  };
  return [isLoading, formData, validationErrors, handleChange, handleSubmit];
};
