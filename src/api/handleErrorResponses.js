const handleErrorResponses = ({ errors }) => {

  console.error("Login failed:", errors.response);
  const status_code = errors.response.status || 500;
  const error = errors?.response?.data?.detail || "An unknown error occurred.";
  console.log("status code:", status_code);

  if (status_code == 403) {
    return error;
  } 
  else if (status_code == 422) {
    console.error("errors", error);
    const newErrors = {};
    for (const item of error) {
      console.log("error item:", item);
      const errorLocation = item?.loc || "unknown";
      newErrors[errorLocation[1]] = item?.msg || "Field required.";
    }
    return newErrors;
  }
  else if (status_code == 404) {
    console.error(
      "API endpoint not found. Please check the URL and try again.",
    );
    return error
  }
  else if (status_code == 400) {
    console.error(
      "Bad request. Please check the submitted data and try again.",
    );
    return error;
  }
  else {
    return "An unknown error occurred.";
  }
};

export default handleErrorResponses
