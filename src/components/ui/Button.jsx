const Button = ({
  buttonName = "Submit",
  onClick,
  size = "md",
  variant = "primary",
  className = "",
}) => {
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-400",
    ghost: "bg-white/10 text-white hover:bg-white/20 ring-1 ring-inset ring-white/5",
  };

  return (
    <button
      onClick={onClick}
      className={`
        font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg
        mb-3 sm:mb-0 sm:mr-2 hover:cursor-pointer
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      
    >
      {buttonName}
    </button>
  );
};

export default Button;