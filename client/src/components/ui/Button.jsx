import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', onClick, to, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-container focus:ring-primary",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-gray-50 focus:ring-primary",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
