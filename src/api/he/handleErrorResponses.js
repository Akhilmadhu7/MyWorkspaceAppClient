const handleErrorResponses = ({ errors, setErrors }) => {

  console.error("Login failed:", errors.response);
  const status_code = errors.response.status || 500;
  const error = errors?.response?.data?.detail || "An unknown error occurred.";
  console.log("status code:", status_code);

  if (status_code == 403) {
    const newErrors = { username: error };
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
  else if (status_code == 404) {
    console.error(
      "API endpoint not found. Please check the URL and try again.",
    );
    // const errors = error?.response?.data?.detail || "An unknown error occurred.";
    const newErrors = { username: error };
    setErrors(newErrors);
  }
  else if (status_code == 400) {
    console.error(
      "Bad request. Please check the submitted data and try again.",
    );
    // const errors = error?.response?.data?.detail || "An unknown error occurred.";
    const newErrors = { username: error };
    setErrors(newErrors);
  }
  else {
    console.log("");
    setErrors({ username: "An uknown error occurred." });
  }
};
